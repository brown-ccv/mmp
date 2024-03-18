import React from "react"

interface CustomInputProps {
  label: string
  placeholder: string
}

export const CustomInput: React.FC<CustomInputProps> = ({ label, placeholder }) => {
  return (
    <>
      <input
        name={label}
        id={label}
        className="text-gray-400 text-sm font-medium outline-none border-b-2 py-2 w-full my-4 mx-2"
        placeholder={placeholder}
        required
      />
    </>
  )
}
