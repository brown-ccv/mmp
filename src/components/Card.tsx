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
  const [showDetails, setShowDetails] = React.useState(false)

  // strip 'public/' from the avatar string since astro's public folder is available without this in the link
  const link = image?.replace("/public", "")
  return (
    <div
      className={`flex flex-row gap-8 ${position % 2 ? "md:flex-row-reverse md:text-right" : ""}`}
    >
      {image && (
        <div>
          <img
            className="object-cover rounded-full w-64 h-64 min-w-64 min-h-64 hidden md:block"
            src={link}
            alt={name}
          />
        </div>
      )}
      <div>
        <div>
          <a className="text-xl font-semibold underline text-neutral-900" href="#">
            {name}
          </a>
          <p className="text-neutral-700 italic">{title}</p>
        </div>
        {showDetails ? (
          <div>
            <button onClick={() => setShowDetails(false)}>- Contact info</button>
            <div className="flex flex-wrap gap-x-12">
              {Boolean(phone) && <p className="text-base">{phone}</p>}
              {Boolean(email) && (
                <a className="hover:text-neutral-300 text-base" href={`mailto:${email}`}>
                  {email}
                </a>
              )}
              {Boolean(address) && <p className="text-base">{address}</p>}
            </div>
          </div>
        ) : (
          <button className="text-neutral-700" onClick={() => setShowDetails(true)}>
            + Contact info
          </button>
        )}
      </div>
    </div>
  )
}

export default Card
