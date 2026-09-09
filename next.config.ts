import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  transpilePackages: [
    "@deck.gl/core",
    "@deck.gl/layers",
    "@deck.gl/react",
    "@luma.gl/core",
    "@luma.gl/engine",
  ],
};

export default nextConfig;
