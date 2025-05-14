import type { NextConfig } from "next";

module.exports = {
   allowedDevOrigins: ['local-origin.dev', '*.local-origin.dev'],
  eslint: {
    ignoreDuringBuilds: true, // 👈 Add this
  },
  api: {
    bodyParser: false,  // Required for file uploads
    responseLimit: '10mb',  // Increase if needed
  },
  images: {
    domains: ["t5dszljshremv95u.public.blob.vercel-storage.com"], // Add your domain
  },
}
const nextConfig: NextConfig = {
   reactStrictMode: true,
   
};

export default nextConfig;
