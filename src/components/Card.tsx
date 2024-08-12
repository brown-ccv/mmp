import React from "react"

interface CardProps {
  position: number
  image?: string
  title: string
  name: string
  link: string
  institution: string
  bio?: string
}

const Card: React.FC<CardProps> = ({ link, image, title, name, institution, bio }) => {
  // strip 'public/' from the avatar string since astro's public folder is available without this in the link
  const imageURL = image?.replace("/public", "")
  return (
    <div className="md:flex-row md:gap-8 flex flex-col gap-4">
      {image && (
        <div className="flex-none">
          <img
            className="md:w-64 md:h-64 object-cover w-40 h-40 rounded-full"
            src={imageURL}
            alt={name}
          />
        </div>
      )}
      <div className="space-y-4">
        <div>
          <a
            className="text-neutral-900 text-xl font-semibold underline"
            href={link}
            target="_blank"
          >
            {name}
          </a>
          <p className="text-neutral-700 italic">{title}</p>
          <p className="small">{institution}</p>
        </div>
        <p>{bio}</p>
      </div>
    </div>
  )
}

export default Card
