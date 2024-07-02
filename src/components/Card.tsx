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
    <div className="flex flex-col md:flex-row gap-4 md:gap-8">
      {image && (
        <div className="flex-none">
          <img
            className="object-cover rounded-full w-40 h-40 md:w-64 md:h-64"
            src={imageURL}
            alt={name}
          />
        </div>
      )}
      <div className="space-y-4">
        <div>
          <a
            className="text-xl font-semibold underline text-neutral-900"
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
