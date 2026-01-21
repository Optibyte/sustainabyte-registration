// next.config.ts
const nextConfig = {
  basePath: "/facility",
  assetPrefix: "/facility",
  trailingSlash: false,
  devIndicators: {
    buildActivity: false,
  },
  experimental: {
    turbo: true,
  },
};

export default nextConfig;
