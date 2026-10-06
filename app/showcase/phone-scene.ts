import * as THREE from "three";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";

export type PhoneScene = {
  update(progress: number): void;
  setVisible(visible: boolean): void;
  dispose(): void;
};

function roundedShape(width: number, height: number, radius: number) {
  const x = -width / 2, y = -height / 2;
  const shape = new THREE.Shape();
  shape.moveTo(x + radius, y);
  shape.lineTo(x + width - radius, y);
  shape.quadraticCurveTo(x + width, y, x + width, y + radius);
  shape.lineTo(x + width, y + height - radius);
  shape.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  shape.lineTo(x + radius, y + height);
  shape.quadraticCurveTo(x, y + height, x, y + height - radius);
  shape.lineTo(x, y + radius);
  shape.quadraticCurveTo(x, y, x + radius, y);
  return shape;
}

export async function createPhoneScene(host: HTMLElement, images: string[], onFailure: () => void): Promise<PhoneScene | undefined> {
  let renderer: THREE.WebGLRenderer;
  try { renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "low-power" }); }
  catch { return undefined; }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(36, 1, .1, 30);
  camera.position.set(0, 0, 10.1);
  const phone = new THREE.Group();
  scene.add(phone);
  const geometries: THREE.BufferGeometry[] = [];
  const materials: THREE.Material[] = [];
  const textures: THREE.Texture[] = [];
  let disposed = false;
  let frame = 0;
  let visible = false;
  let progress = 0;
  let lastChange = 0;
  let lastDraw = 0;
  let pointerX = 0, pointerY = 0;
  const positions = [-.13, .18, -.1, .12];

  function mesh(geometry: THREE.BufferGeometry, material: THREE.Material, z = 0) {
    geometries.push(geometry); materials.push(material);
    const result = new THREE.Mesh(geometry, material);
    result.position.z = z; phone.add(result); return result;
  }
  function flat(width: number, height: number, radius: number, material: THREE.Material, z: number) {
    return mesh(new THREE.ShapeGeometry(roundedShape(width, height, radius), 32), material, z);
  }
  // A neutral device built specifically for JSTACK, with no external model.
  const bodyGeometry = new THREE.ExtrudeGeometry(roundedShape(2.68, 5.66, .34), {
    depth: .14, bevelEnabled: true, bevelSize: .055, bevelThickness: .055, bevelSegments: 3, steps: 1, curveSegments: 24,
  });
  mesh(bodyGeometry, new THREE.MeshStandardMaterial({ color: 0x526176, metalness: .85, roughness: .27 }), -.11);
  flat(2.61, 5.59, .3, new THREE.MeshStandardMaterial({ color: 0x080d16, roughness: .3, metalness: .25 }), .09);
  flat(2.45, 5.38, .24, new THREE.MeshBasicMaterial({ color: 0xf6f8fc }), .106);

  const loader = new THREE.TextureLoader();
  let settled: PromiseSettledResult<THREE.Texture>[];
  try { settled = await Promise.allSettled(images.map(image => loader.loadAsync(image))); }
  catch { renderer.dispose(); renderer.forceContextLoss(); return undefined; }
  for (const result of settled) if (result.status === "fulfilled") textures.push(result.value);
  if (textures.length !== images.length) {
    geometries.forEach(g => g.dispose()); materials.forEach(m => m.dispose()); textures.forEach(t => t.dispose());
    renderer.dispose(); renderer.forceContextLoss(); return undefined;
  }
  textures.forEach(texture => { texture.colorSpace = THREE.SRGBColorSpace; texture.anisotropy = Math.min(4, renderer.capabilities.getMaxAnisotropy()); });
  const screenWidth = 2.45, screenHeight = screenWidth * 800 / 390;
  const geometry = new THREE.ShapeGeometry(roundedShape(screenWidth, screenHeight, .19), 32);
  const pos = geometry.getAttribute("position"), uv = geometry.getAttribute("uv");
  for (let i = 0; i < uv.count; i++) uv.setXY(i, pos.getX(i) / screenWidth + .5, pos.getY(i) / screenHeight + .5);
  uv.needsUpdate = true;
  const screenMaterial = new THREE.ShaderMaterial({
    uniforms: { screenA: { value: textures[0] }, screenB: { value: textures[0] }, blend: { value: 0 } },
    vertexShader: "varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }",
    fragmentShader: "uniform sampler2D screenA; uniform sampler2D screenB; uniform float blend; varying vec2 vUv; void main(){ gl_FragColor=mix(texture2D(screenA,vUv),texture2D(screenB,vUv),blend); #include <colorspace_fragment>\n }".replace("; #include", ";\n#include"),
  });
  const display = mesh(geometry, screenMaterial, .115);
  display.position.y = -.055;
  const island = flat(.56, .12, .06, new THREE.MeshBasicMaterial({ color: 0x080d16 }), .119);
  island.position.y = 2.57;
  const home = flat(.55, .035, .017, new THREE.MeshBasicMaterial({ color: 0x172033 }), .12);
  home.position.y = -2.57;
  for (const [x, y, height] of [[-1.39, .65, .45], [-1.39, 1.24, .35], [1.39, .84, .65]]) {
    const button = mesh(new THREE.BoxGeometry(.045, height, .12), new THREE.MeshStandardMaterial({ color: 0x708299, metalness: .8, roughness: .24 }));
    button.position.set(x, y, -.025);
  }
  const room = new RoomEnvironment();
  const pmrem = new THREE.PMREMGenerator(renderer);
  const environment = pmrem.fromScene(room, .04);
  scene.environment = environment.texture;
  room.dispose(); pmrem.dispose();
  scene.add(new THREE.AmbientLight(0xffffff, 1.7));
  const key = new THREE.DirectionalLight(0xffffff, 3.2); key.position.set(-3, 4, 6); scene.add(key);
  const rim = new THREE.DirectionalLight(0x8bceff, 2.5); rim.position.set(4, 2, 3); scene.add(rim);
  renderer.domElement.setAttribute("aria-hidden", "true");
  host.appendChild(renderer.domElement);

  function draw(time: number) {
    frame = 0;
    if (disposed || !visible || document.hidden) return;
    // Limit the idle loop to about 30fps. No loop runs outside the viewport.
    if (time - lastDraw >= 32) {
      lastDraw = time;
      const index = Math.min(textures.length - 1, Math.floor(progress));
      const next = Math.min(textures.length - 1, index + 1);
      const fraction = progress - index;
      const blend = THREE.MathUtils.smoothstep(fraction, .22, .78);
      screenMaterial.uniforms.screenA.value = textures[index];
      screenMaterial.uniforms.screenB.value = textures[next];
      screenMaterial.uniforms.blend.value = blend;
      const a = positions[index % positions.length], b = positions[next % positions.length];
      const idle = time - lastChange > 300 ? Math.sin(time * .0008) * .012 : 0;
      phone.rotation.set(-.035 + pointerY, THREE.MathUtils.lerp(a, b, fraction) + pointerX, Math.sin(progress * 1.8) * .017);
      phone.position.y = idle;
      renderer.render(scene, camera);
      renderer.domElement.dataset.renderState = "active";
    }
    frame = requestAnimationFrame(draw);
  }
  function wake() { if (!disposed && visible && !document.hidden && !frame) frame = requestAnimationFrame(draw); }
  function resize() {
    if (disposed) return;
    const { width, height } = host.getBoundingClientRect();
    if (!width || !height) return;
    renderer.setSize(width, height, false);
    camera.aspect = width / height; camera.updateProjectionMatrix(); wake();
  }
  const observer = new ResizeObserver(resize); observer.observe(host); resize();
  function pointer(event: PointerEvent) {
    if (event.pointerType !== "mouse") return;
    const rect = host.getBoundingClientRect();
    pointerX = THREE.MathUtils.clamp((event.clientX - rect.left) / rect.width - .5, -.5, .5) * .045;
    pointerY = THREE.MathUtils.clamp((event.clientY - rect.top) / rect.height - .5, -.5, .5) * .025;
    wake();
  }
  function leave() { pointerX = 0; pointerY = 0; wake(); }
  function visibilityChanged() { if (document.hidden) { cancelAnimationFrame(frame); frame = 0; } else wake(); }
  function lost(event: Event) { event.preventDefault(); if (!disposed) onFailure(); }
  host.addEventListener("pointermove", pointer); host.addEventListener("pointerleave", leave);
  document.addEventListener("visibilitychange", visibilityChanged);
  renderer.domElement.addEventListener("webglcontextlost", lost);
  return {
    update(value) { progress = Math.max(0, Math.min(textures.length - 1, value)); lastChange = performance.now(); wake(); },
    setVisible(value) { visible = value; renderer.domElement.dataset.renderState = value ? "visible" : "paused"; if (value) wake(); else { cancelAnimationFrame(frame); frame = 0; } },
    dispose() {
      if (disposed) return;
      disposed = true; cancelAnimationFrame(frame); observer.disconnect();
      host.removeEventListener("pointermove", pointer); host.removeEventListener("pointerleave", leave);
      document.removeEventListener("visibilitychange", visibilityChanged);
      renderer.domElement.removeEventListener("webglcontextlost", lost);
      geometries.forEach(g => g.dispose()); materials.forEach(m => m.dispose()); textures.forEach(t => t.dispose());
      environment?.dispose(); scene.clear(); renderer.renderLists.dispose(); renderer.dispose(); renderer.forceContextLoss(); renderer.domElement.remove();
    },
  };
}
