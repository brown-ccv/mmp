import React, { useState } from "react"
import Select, { type Option } from "react-select"
import PubPlaceholder from "./svg/PubPlaceholder.tsx"

interface PubProps {
  publications: Array<PubObject>
}

interface PubObject {
  data: {
    classification: string
    citation: string
    image?: string
    url?: string
    pdf?: string
  }
}

interface iOption {
  label: string
  value: string
}

const PublicationSection: React.FC<PubProps> = ({ publications }) => {
  const classificationOptions = [
    { value: "Book", label: "Books" },
    {
      value: "Article",
      label: "Articles",
    },
    { value: "Dissertation", label: "Dissertations" },
    { value: "Chapter", label: "Chapters" },
  ]

  const [searchInput, setSearchInput] = useState("")
  const [classificationFilter, setClassificationFilter] = useState(classificationOptions)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setSearchInput(e.target.value)
  }

  const shownPubs = publications.filter(
    (pub) =>
      classificationFilter.map((item) => item.value).includes(pub.data.classification) &&
      pub.data.citation.toLowerCase().includes(searchInput.toLowerCase())
  )
  return (
    <>
      <section className="flex flex-col lg:flex-row gap-4 py-14">
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
            isMulti
            isSearchable={false}
            closeMenuOnSelect={false}
            defaultValue={classificationOptions}
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
            onChange={(option) => setClassificationFilter(option as Array<iOption>)}
          />
        </div>
      </section>

      {shownPubs && (
        <section className="flex flex-col gap-6">
          {classificationOptions.map((option) => {
            return (
              <article key={option.value}>
                <h2 className="py-2">{option.label}</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2  gap-12">
                  {shownPubs.map((publication, i) => {
                    if (publication.data.classification === option.value) {
                      return (
                        <div key={i} className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          <div className="hidden md:block drop-shadow-md">
                            {publication.data.image ? (
                              <img
                                className="drop-shadow-md object-cover w-48 h-72"
                                src={publication.data.image}
                              />
                            ) : (
                              <PubPlaceholder />
                            )}
                          </div>

                          <div className="flex flex-col gap-8 ">
                            <p>{publication.data.citation}</p>
                            {publication.data.pdf && (
                              <button
                                className="bg-neutral-500 text-neutral-50 rounded-full py-3 px-7 w-2/3"
                                onClick={() => window.open(`${publication.data.pdf}`, "_blank")}
                              >
                                View PDF
                              </button>
                            )}
                          </div>
                        </div>
                      )
                    }
                  })}
                </div>
              </article>
            )
          })}
        </section>
      )}
    </>
  )
}

export default PublicationSection
