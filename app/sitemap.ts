import type { MetadataRoute } from "next";
import { isPreview, siteUrl } from "./seo";
export default function sitemap(): MetadataRoute.Sitemap {
  return isPreview ? [] : [{ url: `${siteUrl}/`, lastModified: "2026-10-06" }];
}
