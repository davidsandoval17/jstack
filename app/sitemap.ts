import type { MetadataRoute } from "next";
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://jstack.dev";
export default function sitemap():MetadataRoute.Sitemap{return[{url:siteUrl,lastModified:new Date(),priority:1},{url:`${siteUrl}/design-system`,lastModified:new Date(),priority:.4}]}
