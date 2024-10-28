import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    transpilePackages: ['@walletconnect/ethereum-provider']
};

export default nextConfig;
