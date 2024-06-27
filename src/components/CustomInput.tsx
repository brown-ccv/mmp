import React from "react"
import * as Form from "@radix-ui/react-form"
import type { UseFormRegister } from "react-hook-form"
import type { Inputs } from "./DownloadModal.tsx"

export const CustomInput = React.forwardRef<
  HTMLInputElement,
  {
    label: string
    placeholder: string
    errorMessage?: string
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
  } & ReturnType<UseFormRegister<Inputs>>
>(({ onChange, onBlur, name, label, placeholder, match, errorMessage }, ref) => (
  <Form.Field name={label} className="py-2 my-4 mx-2">
    <Form.Control asChild>
      <input
        name={name}
        ref={ref}
        onChange={onChange}
        onBlur={onBlur}
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
))
