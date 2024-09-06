import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import auth from "auth-astro";

import node from "@astrojs/node";

// https://astro.build/config
export default defineConfig({
  site: "https://example.com",
  output: "hybrid",
  integrations: [mdx(), sitemap(), tailwind(), react(), auth()],
  adapter: node({
    mode: "standalone"
  })
});