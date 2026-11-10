// @ts-check
import { defineConfig, envField } from "astro/config";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import vercel from "@astrojs/vercel";

// The site stays static (fast); only /api/contact runs on the server
// (it opts out with `export const prerender = false`).
// Hosting elsewhere? Swap the adapter: @astrojs/netlify or @astrojs/cloudflare.
export default defineConfig({
  adapter: vercel(),
  integrations: [react()],
  env: {
    schema: {
      // Server-only secrets. Never exposed to the browser.
      APPS_SCRIPT_URL: envField.string({ context: "server", access: "secret", optional: true }),
      APPS_SCRIPT_SECRET: envField.string({ context: "server", access: "secret", optional: true }),
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
