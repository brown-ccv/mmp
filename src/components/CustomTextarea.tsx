import React from "react"
import * as Form from "@radix-ui/react-form"

interface CustomTextareaProps {
  label: string
  placeholder: string
}

export const CustomTextarea: React.FC<CustomTextareaProps> = ({ label, placeholder }) => {
  return (
    <Form.Field name={label} className="py-2 my-4 mx-2">
      <Form.Control asChild>
        <textarea
          rows={4}
          id={label}
          className="text-gray-400 text-sm font-medium outline-none border-b-2 w-full"
          placeholder={placeholder}
          required
        />
      </Form.Control>
      <Form.Message className="text-red-600 text-lg" match="valueMissing">
        Please enter your {label}
      </Form.Message>
    </Form.Field>
  )
}
