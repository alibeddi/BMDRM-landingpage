/**
 * @type {import('next').NextConfig}
 */

const nextConfig = {
  basePath: process.env.BASEPATH,
  output: "standalone",

  reactStrictMode: false,
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
};

module.exports = nextConfig;
