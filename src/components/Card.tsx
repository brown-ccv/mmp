import React from "react"

interface CardProps {
  image?: string
  title: string
  name: string
}

const Card: React.FC<CardProps> = ({ image, title, name }) => {
  return (
    <div className="flex flex-row items-center">
      {image && (
        <div>
          <img
            className="object-cover w-72 h-72 rounded-full"
            src={image}
            alt={`${name}'s image`}
          />
        </div>
      )}
      <div className="px-8">
        <p>{name}</p>
        <p>{title}</p>
      </div>
    </div>
  )
}

export default Card
