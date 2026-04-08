const runtimeCaching = require("next-pwa/cache");

const withPWA = require("next-pwa")({
  disable: process.env.NODE_ENV === "development",
  dest: "public",
  runtimeCaching,
});

module.exports = withPWA({
  reactStrictMode: false,
  webpack: (config) => {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      animejs$: require.resolve("animejs/lib/anime.js"),
    };
    return config;
  },
});
