import React from "react"

interface CustomTextareaProps {
  label: string
  placeholder: string
}

export const CustomTextarea: React.FC<CustomTextareaProps> = ({ label, placeholder }) => {
  return (
    <>
      <textarea
        id={label}
        className="text-gray-400 text-sm font-medium outline-none border-b-2 py-2 w-full my-4 mx-2"
        placeholder={placeholder}
      />
    </>
  )
}
