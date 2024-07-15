import React, { useState } from "react"
import Select, { type SingleValue } from "react-select"
import type { InferEntrySchema } from "astro:content"
import type { Classification } from "../content/config.ts"
import PubPlaceholder from "./svg/PubPlaceholder.tsx"

interface PubProps {
  publications: InferEntrySchema<"publications">[]
}

const PublicationSection: React.FC<PubProps> = ({ publications }) => {
  //console.log(publications)
  const classificationOptions = [
    { value: "Book", label: "Books" },
    {
      value: "Article",
      label: "Articles",
    },
    { value: "Dissertation", label: "Dissertations" },
    { value: "Chapter", label: "Chapters" },
  ] as const

  const [searchInput, setSearchInput] = useState("")
  const [classificationFilter, setClassificationFilter] = useState<
    SingleValue<Readonly<{ value: Classification; label: string }>>
  >({ value: "Book", label: "Books" })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setSearchInput(e.target.value)
  }

  const featuredPubs = publications.filter((pub) => pub.feature)

  const shownPubs = publications.filter(
    (pub) =>
      classificationFilter &&
      classificationFilter.value.includes(pub.classification) &&
      pub.citation.toLowerCase().includes(searchInput.toLowerCase())
  )
  console.log(shownPubs)

  const categoryByYear: Record<string, InferEntrySchema<"publications">[]> = shownPubs.reduce(
    (pub, i) => {
      const key = i.pubDate.toISOString().substring(0, 4)
      pub[key] = pub[key] ?? []
      pub[key].push(i)
      return pub
    },
    {} as Record<string, InferEntrySchema<"publications">[]>
  )
  const pubsByYear = Object.entries(categoryByYear).sort(
    (a, b) => new Date(b[0]).getTime() - new Date(a[0]).getTime()
  )
  console.log(pubsByYear)
  return (
    <>
      <section className="flex flex-col gap-6">
        <h2>Featured Publications</h2>
        {featuredPubs.map((publication, i) => {
          return (
            <div key={i} className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <div className="flex flex-col gap-8 ">
                <p>{publication.citation}</p>
                {publication.pdf && (
                  <button
                    className="bg-neutral-500 text-neutral-50 rounded-full py-3 px-7 w-2/3"
                    onClick={() => window.open(`${publication.pdf}`, "_blank")}
                  >
                    View PDF
                  </button>
                )}
              </div>
            </div>
          )
        })}
      </section>
      <section className="flex flex-col py-14 gap-4">
        <h2>All Publications</h2>
        <div className="flex flex-col lg:flex-row gap-4">
          <div>
            <label className="pl-1">Search for a Publication</label>
            <input
              type="text"
              placeholder="🔍 Search here"
              onChange={handleChange}
              value={searchInput}
              className="min-w-[460px]"
            />
          </div>
          <div>
            <label className="pl-1">Show</label>
            <Select
              options={classificationOptions}
              isSearchable={false}
              closeMenuOnSelect={true}
              defaultValue={classificationFilter}
              styles={{
                control: (baseStyles) => ({
                  ...baseStyles,
                  minWidth: "526px",
                  borderRadius: "9999px",
                  background: "#FAFAFA",
                  boxShadow:
                    "var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)",
                  paddingTop: ".75rem",
                  paddingBottom: ".75rem",
                  paddingLeft: "2rem",
                  paddingRight: "2rem",
                }),
              }}
              onChange={(option) => setClassificationFilter(option)}
            />
          </div>
        </div>
      </section>

      {pubsByYear && (
        <section className="flex flex-col gap-6">
          {classificationOptions.map((option) => {
            if (classificationFilter && classificationFilter.label === option.label) {
              return (
                <article key={option.value}>
                  <h2 className="py-2">{option.label}</h2>
                  <div className="py-4">
                    {pubsByYear.map((cat, i) => {
                      return (
                        <div key={i} className="flex flex-col gap-4 py-6">
                          <h3 className="">{cat[0]}</h3>
                          {cat[1].map((pub) => {
                            return (
                              <div
                                key={pub.citation}
                                className={
                                  option.label === "Books"
                                    ? "grid grid-cols-1 md:grid-cols-2 gap-2"
                                    : ""
                                }
                              >
                                {option.label === "Books" && (
                                  <div className="hidden md:block drop-shadow-md">
                                    {pub.image ? (
                                      <img
                                        className="drop-shadow-md object-cover w-48 h-72"
                                        src={pub.image}
                                      />
                                    ) : (
                                      <PubPlaceholder />
                                    )}
                                  </div>
                                )}

                                <div className="flex flex-col gap-8 ">
                                  <p>{pub.citation}</p>
                                  {pub.pdf && (
                                    <button
                                      className="bg-neutral-500 text-neutral-50 rounded-full py-3 px-7 w-2/3"
                                      onClick={() => window.open(`${pub.pdf}`, "_blank")}
                                    >
                                      View PDF
                                    </button>
                                  )}
                                </div>
                              </div>
                            )
                          })}
                        </div>
                      )
                    })}
                  </div>
                </article>
              )
            }
          })}
        </section>
      )}
    </>
  )
}

export default PublicationSection
