const withPWA = require("next-pwa");
const runtimeCaching = require("next-pwa/cache");

console.log('===>', process.env.NODE_ENV);

module.exports = withPWA({
  disable: process.env.NODE_ENV === "development",
  pwa: {
    dest: "public",
    runtimeCaching,
  },
});
