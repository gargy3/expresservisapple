import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ['image/webp'],
  },
  async redirects() {
    return [
      // Staré URL z původního webu (Webnode) typu "Kontakty-a2_0.htm",
      // "Cenik-a3_0.htm" apod. jsou stále indexované v Google a bez
      // přesměrování na nich lidé skončí na 404. Pošleme je na homepage.
      {
        source: '/:old(.*-a\\d+_\\d+\\.htm)',
        destination: '/',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
