import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Uploadthing CDN (used for demo placeholders)
      { protocol: 'https', hostname: 'me7aitdbxq.ufs.sh' },
      // Pexels free stock images
      { protocol: 'https', hostname: 'images.pexels.com' },
      { protocol: 'https', hostname: 'videos.pexels.com' },
      // Unsplash free stock images
      { protocol: 'https', hostname: 'images.unsplash.com' },
      // When PENATEC adds their own CDN, add the domain here
    ],
  },
};

export default nextConfig;
