/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
  // Fix workspace root warning
  outputFileTracingRoot: __dirname,
}

module.exports = nextConfig
