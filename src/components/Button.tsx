import React, { type ReactNode } from "react"

interface ButtonProps
  extends React.PropsWithChildren<React.ButtonHTMLAttributes<HTMLButtonElement>> {
  icon?: ReactNode
}

export default function Button({ icon, children, ...delegated }: ButtonProps) {
  return (
    <button className="bg-primary-500" {...delegated}>
      {icon}
      <span>{children}</span>
    </button>
  )
}
