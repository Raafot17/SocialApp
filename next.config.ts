import type { NextConfig } from "next";
//https://linked-posts.routemisr.com/uploads/undefined
const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
   images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'linked-posts.routemisr.com',
        pathname: '/uploads/*',
      },
    ],
  },

};

export default nextConfig;
