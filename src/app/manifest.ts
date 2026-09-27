import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "The Commonplace",
    short_name: "Commonplace",
    description:
      "A Renaissance commonplace book for your Goodreads shelves — quotes, reflections, and the ideas that connect them.",
    start_url: "/",
    display: "standalone",
    background_color: "#16110d",
    theme_color: "#16110d",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
