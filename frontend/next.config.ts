import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // Enable static export for Firebase Hosting
  output: 'export',
  trailingSlash: true, // Helps with static export routing
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
