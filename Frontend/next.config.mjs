/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable static HTML export for production with Nginx
  output: process.env.BUILD_STANDALONE === 'true' ? 'standalone' : 'export',
  
  // Disable image optimization for static export
  images: {
    unoptimized: true,
  },

  // Trailing slash for better nginx compatibility
  trailingSlash: true,

  // Environment variables exposed to the browser
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || '',
  },
};

export default nextConfig;
