import process from "node:process";
import { URL } from "node:url";
import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";
import { pluginPWA } from "rsbuild-plugin-pwa";
import { buildTmdbUrl } from "./functions/api/[[path]].js";

const tmdbApiKey = process.env.TMDB_API_KEY;

export default defineConfig({
  plugins: [
    pluginReact(),
    pluginPWA({
      htmlTags: { themeColor: true },
      registerSw: {
        type: "script",
        features: { autoSkipWaiting: true },
      },
      sw: {
        mode: "generateSw",
        include: ["**/*.{css,html,ico,jpg,js,json,png,svg,webmanifest}"],
        workboxOptions: {
          clientsClaim: true,
          navigateFallback: "/index.html",
          navigateFallbackDenylist: [/^\/api\//],
          runtimeCaching: [
            {
              urlPattern: /^https:\/\/image\.tmdb\.org\//,
              handler: "StaleWhileRevalidate",
              options: {
                cacheName: "tmdb-images",
                expiration: { maxEntries: 64, maxAgeSeconds: 86400 },
              },
            },
            {
              urlPattern: /^https:\/\/fonts\.(?:googleapis|gstatic)\.com\//,
              handler: "StaleWhileRevalidate",
              options: {
                cacheName: "google-fonts",
                expiration: { maxEntries: 8, maxAgeSeconds: 604800 },
              },
            },
          ],
        },
      },
      webAppManifest: {
        content: {
          name: "CMDb",
          short_name: "CMDb",
          description: "Cyber-themed movie database",
          start_url: "/",
          display: "standalone",
          background_color: "#021114",
          theme_color: "#00f8f8",
        },
      },
    }),
  ],
  html: {
    title: "CMDb",
    meta: {
      viewport: "width=device-width, initial-scale=1.0",
    },
    tags: [
      {
        tag: "link",
        attrs: { rel: "preconnect", href: "https://fonts.googleapis.com" },
        publicPath: false,
      },
      {
        tag: "link",
        attrs: {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
          crossorigin: "",
        },
        publicPath: false,
      },
      {
        tag: "link",
        attrs: {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700&display=swap",
        },
        publicPath: false,
      },
    ],
  },
  server: {
    proxy: tmdbApiKey
      ? {
          "/api": {
            target: "https://api.themoviedb.org",
            pathRewrite: (path) => {
              const requestUrl = new URL(path, "http://localhost");
              const apiUrl = buildTmdbUrl(
                requestUrl,
                requestUrl.pathname.replace(/^\/api\//, ""),
                tmdbApiKey,
              );
              return `${apiUrl.pathname}${apiUrl.search}`;
            },
          },
        }
      : undefined,
  },
});
