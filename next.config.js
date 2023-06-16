/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async rewrites() {
    return [
      {
        source: '/:path*',
        destination: 'http://localhost:3001/:path*',
      },
    ]
  },
};

module.exports = nextConfig;