import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: {
    authInterrupts: true,
    dynamicIO: true,
    ppr: true,
  },
  images: {
    remotePatterns: [new URL('https://i.scdn.co/**')],
  },
};

export default nextConfig;
