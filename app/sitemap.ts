import type { MetadataRoute } from "next";

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://samskrithi.org").replace(/\/$/, "");

const routes: { path: string; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"]; priority: number }[] = [
  { path: "", changeFrequency: "weekly", priority: 1 },
  { path: "/about", changeFrequency: "monthly", priority: 0.8 },
  { path: "/activities", changeFrequency: "weekly", priority: 0.8 },
  { path: "/events", changeFrequency: "weekly", priority: 0.9 },
  { path: "/gallery", changeFrequency: "weekly", priority: 0.7 },
  { path: "/contact", changeFrequency: "yearly", priority: 0.6 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return routes.map(({ path, changeFrequency, priority }) => ({
    url: `${siteUrl}${path}`,
    lastModified,
    changeFrequency,
    priority,
  }));
}
