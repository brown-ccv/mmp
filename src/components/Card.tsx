import React from "react"

interface CardProps {
  position: number
  image?: string
  title: string
  name: string
  institution: string
}

const Card: React.FC<CardProps> = ({ position, image, title, name, institution }) => {
  // strip 'public/' from the avatar string since astro's public folder is available without this in the link
  const link = image?.replace("/public", "")
  return (
    <div
      className={`flex flex-wrap gap-x-8 ${position % 2 ? "md:flex-row-reverse md:text-right" : ""}`}
    >
      {image && (
        <div>
          <img className="object-cover rounded-full w-64 h-64" src={link} alt={name} />
        </div>
      )}
      <div>
        <a className="text-xl font-semibold underline text-neutral-900" href="#">
          {name}
        </a>
        <p className="text-neutral-700 italic">{title}</p>
        <p className="small">{institution}</p>
      </div>
    </div>
  )
}

export default Card
