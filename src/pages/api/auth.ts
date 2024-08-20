import crypto from "crypto"
import { create } from "../../../api/_lib/oauth2.ts"

export const prerender = false

export const GET = () => {
  const randomString = () => crypto.randomBytes(4).toString(`hex`)
  const host = "https://mmp-site-b1c9b.web.app"
  const oauth2 = create()

  const url = oauth2.authorizationCode.authorizeURL({
    redirect_uri: `${host}/api/callback`,
    scope: `repo,user`,
    state: randomString(),
  })
  return Response.redirect(url, 301)
}
