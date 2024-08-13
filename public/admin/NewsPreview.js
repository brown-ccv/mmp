export const NewsPreview = ({ widgetFor, entry, collection, fields }) => {
  const imageField = useMemo(() => fields.find((field) => field.name === "heroImage"), [fields])
  const imageUrl = useMediaAsset(entry.data.heroImage, collection, imageField, entry)

  return h(
    "div",
    {},
    h("div", { className: "space-y-3 pb-6" }, h("h1", {}, entry.data.title)),
    h("hr", { className: "border-none h-0.5 bg-neutral-900 mb-16" }),
    h(
      "div",
      {},
      h(
        "div",
        {},

        h("img", { src: imageUrl, className: "w-full" })
      ),
      h("time", {}, entry.data.pubDate),
      h("div", { className: "text" }, widgetFor("body"))
    )
  )
}
