import React, { useState } from "react"
import Select from "react-select"
import type { InferEntrySchema } from "astro:content"
import { Form } from "@radix-ui/react-form"
import type { Classification } from "../content/config.ts"
import PubPlaceholder from "./svg/PubPlaceholder.tsx"
import { Input } from "./Input.tsx"
import { MagnifyingGlassIcon } from "@radix-ui/react-icons"

interface PubProps {
  publications: InferEntrySchema<"publications">[]
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
  ] as const

  const [searchInput, setSearchInput] = useState("")
  const [classificationFilter, setClassificationFilter] =
    useState<Readonly<{ value: Classification; label: string }[]>>(classificationOptions)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setSearchInput(e.target.value)
  }

  const shownPubs = publications.filter(
    (pub) =>
      classificationFilter.map((item) => item.value).includes(pub.classification) &&
      pub.citation.toLowerCase().includes(searchInput.toLowerCase())
  )

  return (
    <>
      <Form className="flex flex-col lg:flex-row gap-4 justify-center mb-24">
        <div>
          <Input
            label="Search for a publication"
            name="pubQuery"
            icon={<MagnifyingGlassIcon className="h-full w-full" />}
            placeholder="Durand, Jorge..."
            value={searchInput}
            onChange={handleChange}
            className="min-w-96"
          />
        </div>
        <div className="space-y-2">
          <label className="pl-1" htmlFor="classification">
            Show
          </label>
          <Select
            id="classification"
            options={classificationOptions}
            isMulti
            isSearchable={false}
            closeMenuOnSelect={false}
            defaultValue={classificationOptions}
            unstyled
            className="cursor-pointer"
            classNames={{
              container: () =>
                "cursor-pointer bg-white rounded-full shadow-inner min-w-60 w-max py-3 px-5",
              placeholder: () => "cursor-pointer text-neutral-300",
              indicatorsContainer: () => "cursor-pointer text-neutral-300 hover:bg-neutral-200",
              multiValueRemove: () => "hover:bg-neutral-100",
              valueContainer: () => "gap-2 cursor-pointer",
              multiValue: () =>
                "cursor-pointer flex items-center gap-2 text-primary-500 bg-neutral-50 px-2 rounded-lg",
              menu: () => "cursor-pointr rounded-lg bg-white p-2",
              // See CSS file for other overrides
              option: () => "rounded-sm p-1 hover:text-primary-500 hover:bg-neutral-50",
            }}
            styles={{
              control: (baseStyles) => ({ ...baseStyles, minHeight: 0 }),
              option: (baseStyles) => ({ ...baseStyles, cursor: "pointer" }),
            }}
            onChange={(option) => setClassificationFilter(option)}
          />
        </div>
      </Form>

      {shownPubs && (
        <section className="flex flex-col gap-6">
          {classificationOptions.map((option) => {
            return (
              <article key={option.value}>
                <h2 className="mb-10">{option.label}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  {shownPubs.map((publication, i) => {
                    if (publication.classification === option.value) {
                      return (
                        <div key={i} className="flex gap-8 content-start">
                          <div className="flex-none hidden md:block shadow-book-shadow w-40 h-72">
                            {publication.image ? (
                              <img
                                className="flex-none object-cover h-full w-full"
                                src={publication.image}
                              />
                            ) : (
                              <PubPlaceholder />
                            )}
                          </div>

                          <div className="flex flex-col gap-8">
                            <p className="font-bold">{publication.citation}</p>
                            {publication.pdf && (
                              <a
                                className="no-underline bg-neutral-500 text-neutral-50 rounded-full py-3 px-7 w-max"
                                href={publication.pdf}
                              >
                                View PDF
                              </a>
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
