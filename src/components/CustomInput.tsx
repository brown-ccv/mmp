import React from "react"

interface CustomInputProps {
  label: string
  placeholder: string
}

export const CustomInput: React.FC<CustomInputProps> = ({ label, placeholder }) => {
  return (
    <div className="flex flex-col gap-3">
      <label htmlFor={label}>{label}</label>
      <input name={label} id={label} placeholder={placeholder} required />
    </div>
  )
}
