import type { NextConfig } from "next";
const { PrismaPlugin } = require('@prisma/nextjs-monorepo-workaround-plugin')

const nextConfig: NextConfig = {
  /* config options here */
  webpack: (config) => {
    config.plugins.push(new PrismaPlugin());
    return config;
  }
};

export default nextConfig;
