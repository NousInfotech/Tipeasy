/** @type {import('next').NextConfig} */

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.pravatar.cc',
        pathname: '/**',  // Allows all paths under this hostname
      },
      {
        protocol: 'https',
        hostname: 'dummyimage.com',
        pathname: '/**',  // Allows all paths under this hostname
      },
    ],
  },
  transpilePackages: ['lucide-react'],
};

export default nextConfig;