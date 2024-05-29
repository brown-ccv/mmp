import React from "react"

interface CardProps {
  position: number
  image?: string
  title: string
  name: string
  address?: string
  phone?: string
  email?: string
}

const Card: React.FC<CardProps> = ({ position, image, title, name, address, phone, email }) => {
  return (
    <div
      className={
        position % 2
          ? "flex flex-row items-center flex-row-reverse text-right"
          : "flex flex-row items-center"
      }
    >
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
        <div>
          <p className="text-xl font-semibold">{name}</p>
          <p className="italic">{title}</p>
        </div>
        <div>
          {address && <p className="text-base">{address}</p>}
          {phone && <p className="text-base">{phone}</p>}
          {email && (
            <a className="text-base hover:text-neutral-300" href={`mailto:${email}`}>
              {email}
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

export default Card
