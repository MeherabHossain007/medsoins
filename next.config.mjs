/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Allow production builds to successfully complete even if
    // the project has ESLint configuration or rule errors.
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
