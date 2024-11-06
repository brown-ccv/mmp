import { defineConfig } from "astro/config"
import mdx from "@astrojs/mdx"
import sitemap from "@astrojs/sitemap"
import tailwind from "@astrojs/tailwind"
import react from "@astrojs/react"
import node from "@astrojs/node"

import decapCmsOauth from "astro-decap-cms-oauth"

// https://astro.build/config
export default defineConfig({
  output: "server",
  integrations: [
    decapCmsOauth({ decapCMSVersion: "3.3.3", adminDisabled: false }),
    mdx(),
    sitemap(),
    tailwind(),
    react(),
  ],
  adapter: node({
    mode: "@astrojs/node",
  }),
})
