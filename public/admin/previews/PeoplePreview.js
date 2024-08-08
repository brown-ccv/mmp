export const PeoplePreview = ({ widgetFor, entry, collection, fields }) => {
  const imageField = useMemo(() => fields.find((field) => field.name === "avatar"), [fields])
  const imageUrl = useMediaAsset(entry.data.avatar, collection, imageField, entry)

  return h(
    "div",
    { className: "flex flex-col md:flex-row gap-4 md:gap-8" },
    h(
      "div",
      { className: "flex-none" },

      h("img", { src: imageUrl, className: "object-cover rounded-full w-40 h-40 md:w-64 md:h-64" })
    ),
    h(
      "div",
      { className: "space-y-4" },
      h(
        "div",
        {},

        h(
          "a",
          { href: imageUrl, className: "text-xl font-semibold underline text-neutral-900" },
          entry.data.name
        ),
        h("p", { className: "text-neutral-700 italic" }, entry.data.title),
        h("p", { className: "small" }, entry.data.org)
      ),

      h("p", {}, entry.data.bio)
    )
  )
}
