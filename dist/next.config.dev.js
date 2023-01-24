"use strict";

/** @type {import('next').NextConfig} */
var nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    domains: ["res.cloudinary.com"]
  },
  publicRuntimeConfig: {
    SOLANA_NETWORK: "https://neat-dry-patron.solana-mainnet.quiknode.pro/49a414d786b7497bca9f7f09df812df6d458c929",
    SERVER_URL: "https://bonespoker.com:4000",
    ADMIN_ADDRESS: "Nu8tPJheGmoe1RnZXTcEs8pPa52CBUNR72DZsqTUd5V",
    AUTO_START_TIME: 300,
    AUTO_FOLD_TIME: 30
  }
}; // https://neat-dry-patron.solana-mainnet.quiknode.pro/49a414d786b7497bca9f7f09df812df6d458c929

module.exports = nextConfig;