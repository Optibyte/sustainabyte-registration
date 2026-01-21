// next.config.ts
const nextConfig = {
  basePath: "/facility",
  assetPrefix: "/facility",
  trailingSlash: false,
  devIndicators: {
    buildActivity: false,
  },
  allowedDevOrigins: ["sustainabyte.ai"],
  onDemandEntries: {
    maxInactiveAge: 60 * 1000,
    pagesBufferLength: 5,
  },
  experimental: {
    optimizePackageImports: ["@radix-ui"],
  },
};

export default nextConfig;
