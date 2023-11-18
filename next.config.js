/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      "id.maiar.com",
      "flzavuqgiwduroylglww.supabase.co",
      "cxuglqomjolmilyyiclj.supabase.co",
    ],
  },
  transpilePackages: ["@multiversx/sdk-dapp"],
  webpack: (config) => {
    config.externals.push("pino-pretty", "lokijs", "encoding");
    return config;
  },
};

module.exports = nextConfig;
