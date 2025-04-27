import type { NextConfig } from "next";

module.exports = {
  eslint: {
    ignoreDuringBuilds: true, // 👈 Add this
  },
}

const nextConfig: NextConfig = {
   reactStrictMode: true,
   
   // @ts-ignore
};

export default nextConfig;
