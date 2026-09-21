import type { Metadata } from "next";
import { site } from "@/content/site";

export function pageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  const image = {
    url: "/opengraph-image.png",
    width: 1200,
    height: 630,
    alt: `${site.name} — ${site.tagline}`,
  };

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "es_CL",
      url: `${site.url}${path}`,
      siteName: site.name,
      title: `${title} | ${site.name}`,
      description,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${site.name}`,
      description,
      images: [image.url],
    },
  };
}
