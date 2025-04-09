import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: {
    dynamicIO: true,
    ppr: true,
    viewTransition: true,
  },
};

export default nextConfig;
