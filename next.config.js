/**
 * @type {import('next').NextConfig}
 */

const nextConfig = {
  basePath: process.env.BASEPATH,
  output: "standalone",

  reactStrictMode: false,
};

module.exports = nextConfig;
