import type { NextConfig } from "next";

module.exports = {
   allowedDevOrigins: ['local-origin.dev', '*.local-origin.dev'],
  eslint: {
    ignoreDuringBuilds: true, // 👈 Add this
  },
  images: {
    domains: ["t5dszljshremv95u.public.blob.vercel-storage.com"], // Add your domain
  },
  api: {

    bodyParser: false,
    responseLimit:'10mb'
  },
}
const nextConfig: NextConfig = {
   reactStrictMode: true,
   
};

export default nextConfig;

