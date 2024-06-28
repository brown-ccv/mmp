import React from "react"

interface CircleProps {
  width?: number
  height?: number
  styling: string
}

const CircleIcon: React.FC<CircleProps> = ({ styling, width = 20, height = 20 }) => {
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width={width}
        height={height}
        className={styling}
      >
        <circle r="12" cx="12" cy="12" />
      </svg>
    </>
  )
}

export default CircleIcon
