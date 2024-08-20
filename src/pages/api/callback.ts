import { create, renderBody } from "../../../api/_lib/oauth2.ts"

export const GetCallback = async (req: Request) => {
  const params = new URLSearchParams(req.url)
  const code = params.get("code") || ""
  const host = "https://mmp-site-b1c9b.web.app"
  const oauth2 = create()

  try {
    const accessToken = await oauth2.authorizationCode.getToken({
      code,
      redirect_uri: `${host}/api/callback`,
    })
    const { token } = oauth2.accessToken.create(accessToken)
    return Response.redirect(
      renderBody("success", {
        token: token.access_token,
        provider: "github",
      }),
      200
    )
  } catch (e: any) {
    return Response.redirect(renderBody("error", e.message), 200)
  }
}
