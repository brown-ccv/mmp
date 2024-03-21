import React from "react"
import * as Form from "@radix-ui/react-form"

interface CustomInputProps {
  label: string
  placeholder: string
  match?:
    | "valueMissing"
    | "badInput"
    | "patternMismatch"
    | "rangeOverflow"
    | "rangeUnderflow"
    | "stepMismatch"
    | "tooLong"
    | "tooShort"
    | "typeMismatch"
    | "valid"
  errorMessage?: string
}

export const CustomInput: React.FC<CustomInputProps> = ({
  label,
  placeholder,
  match,
  errorMessage,
}) => {
  return (
    <Form.Field name={label} className="py-2 my-4 mx-2">
      <Form.Control asChild>
        <input
          name={label}
          id={label}
          className="text-gray-400 text-sm font-medium outline-none border-b-2 w-full"
          placeholder={placeholder}
          required
        />
      </Form.Control>
      <Form.Message className="text-red-600 text-lg" match="valueMissing">
        Please enter your {label}
      </Form.Message>
      {match !== undefined && (
        <>
          <Form.Message match={match}>{errorMessage}</Form.Message>
        </>
      )}
    </Form.Field>
  )
}
