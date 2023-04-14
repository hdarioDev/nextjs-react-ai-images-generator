/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ["hdariodevtest98e7b2.blob.core.windows.net"],
  },
};

module.exports = nextConfig;
