import type { NextConfig } from "next";

module.exports = {
   allowedDevOrigins: ['local-origin.dev', '*.local-origin.dev'],
  eslint: {
    ignoreDuringBuilds: true, // 👈 Add this
  },
}
const nextConfig: NextConfig = {
   reactStrictMode: true,
   
};

export default nextConfig;
