import React from "react"
import * as HoverCard from "@radix-ui/react-hover-card"

interface HoverCardItemProps {
  image?: string
  alt?: string
  title: string
  content: string | React.ReactNode
  footer?: string | React.ReactNode
  trigger: React.ReactNode
}

const HoverCardItem: React.FC<HoverCardItemProps> = ({
  trigger,
  alt,
  title,
  content,
  footer,
  image,
}) => {
  return (
    <HoverCard.Root openDelay={2}>
      <HoverCard.Trigger asChild>
        <a className="cursor-pointer" rel="noreferrer noopener">
          {trigger}
        </a>
      </HoverCard.Trigger>
      <HoverCard.Portal>
        <HoverCard.Content sideOffset={5}>
          <div className="bg-white p-5 rounded shadow flex flex-col gap-3.5">
            {image && alt && <img className="w-14 h-14 rounded-full" src={image} alt={alt} />}
            <div className="flex flex-col gap-3.5">
              <p className="font-semibold">{title}</p>
              <div>{content}</div>
              {footer && (
                <div className="flex gap-3.5">
                  <p>{footer}</p>
                </div>
              )}
            </div>
          </div>
          <HoverCard.Arrow className="fill-white" />
        </HoverCard.Content>
      </HoverCard.Portal>
    </HoverCard.Root>
  )
}

export default HoverCardItem
