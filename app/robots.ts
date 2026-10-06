import type { MetadataRoute } from "next";
import { isPreview, siteUrl } from "./seo";
export default function robots(): MetadataRoute.Robots {
  return isPreview ? { rules: { userAgent: "*", disallow: "/" } }
    : { rules: { userAgent: "*", allow: "/" }, sitemap: `${siteUrl}/sitemap.xml` };
}
