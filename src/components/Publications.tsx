import React, { useEffect, useState } from "react"
import Select from "react-select"

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

  const [shownPubs, setShownPubs] = useState(publications)
  const [searchInput, setSearchInput] = useState("")
  const [classificationFilter, setClassificationFilter] = useState(classificationOptions)
  const handleChange = (e: {
    preventDefault: () => void
    target: { value: React.SetStateAction<string> }
  }) => {
    e.preventDefault()
    setSearchInput(e.target.value)
  }

  useEffect(() => {
    let currentPubs = publications
    // filter based on classification
    if (classificationFilter.length > 0) {
      const filteredClassifications = classificationFilter.map(({ value }) => value)
      currentPubs = currentPubs.filter((pub) =>
        filteredClassifications.includes(pub.data.classification)
      )
    }

    if (searchInput.length > 0) {
      // do a search for Pubs
      const foundPublications = currentPubs.filter(
        (pub: { data: { citation: string | string[] } }) => {
          if (pub.data && pub.data.citation.includes(searchInput)) {
            return pub
          }
        }
      )
      if (foundPublications.length > 0) {
        currentPubs = foundPublications
      } else {
        currentPubs = []
      }
    }

    setShownPubs(currentPubs)
  }, [searchInput, classificationFilter])

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
            isMulti={true}
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
            onChange={(e) => {
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              setClassificationFilter(e)
            }}
          />
        </div>
      </section>

      {shownPubs && (
        <section className="flex flex-col gap-6">
          {classificationOptions.map((option) => {
            return (
              <article>
                <h2>{option.label}</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  {shownPubs.map((publication, i) => {
                    if (publication.data.classification === option.value) {
                      return (
                        <div key={i} className="flex gap-5">
                          {publication.data.image && (
                            <img
                              className="hidden md:block drop-shadow-md"
                              src={publication.data.image}
                            />
                          )}
                          <div className="flex flex-col gap-10">
                            <p>{publication.data.citation}</p>
                            {publication.data.pdf && (
                              <button
                                className="bg-neutral-500 text-neutral-50 rounded-full py-3 px-7 w-2/3"
                                onClick={() => console.log(publication.data.pdf)}
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
