import { signIn } from "../../node_modules/auth-astro/client.ts"
import { PeoplePreview } from "./previews/PeoplePreview.js"
import { NewsPreview } from "./previews/NewsPreview.js"

console.log("HI WE ARE HERE DOING THINGS")

if (document.body.contains(document.querySelector(".CMS_Login_button"))) {
  console.log("IT IS HERE")
}
document.getElementsByTagName("button").onclick = () => {
  signIn("github")
  console.log("overriding")
}
window.CMS.registerBackend("astro-auth")
window.CMS.init()
window.CMS.registerPreviewStyle("../src/styles/global.css")

window.CMS.registerPreviewTemplate("people", PeoplePreview)
window.CMS.registerPreviewTemplate("news", NewsPreview)
