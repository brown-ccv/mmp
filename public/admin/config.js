import { PeoplePreview } from "./previews/PeoplePreview.js"
import { NewsPreview } from "./previews/NewsPreview.js"

window.CMS.init()
window.CMS.registerPreviewStyle("../src/styles/global.css")

window.CMS.registerPreviewTemplate("people", PeoplePreview)
window.CMS.registerPreviewTemplate("news", NewsPreview)
