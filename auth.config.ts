import GitHub from "@auth/core/providers/github"
import { defineConfig } from "auth-astro"

export default defineConfig({
  debug: true,
  injectEndpoints: false,
  providers: [
    GitHub({
      clientId: import.meta.env.GITHUB_CLIENT_ID,
      clientSecret: import.meta.env.GITHUB_CLIENT_SECRET,
    }),
  ],
})
