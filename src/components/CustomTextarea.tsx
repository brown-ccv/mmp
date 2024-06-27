import React from "react"
import * as Form from "@radix-ui/react-form"
import type { UseFormRegister } from "react-hook-form"
import type { Inputs } from "./DownloadModal.tsx"

export const CustomTextarea = React.forwardRef<
  HTMLTextAreaElement,
  {
    label: string
    placeholder: string
  } & ReturnType<UseFormRegister<Inputs>>
>(({ onChange, onBlur, name, label, placeholder }, ref) => (
  <Form.Field name={name} className="flex flex-col gap-2">
    <Form.Label>{label}</Form.Label>
    <Form.Control asChild>
      <textarea
        rows={4}
        name={name}
        ref={ref}
        onChange={onChange}
        onBlur={onBlur}
        className="text-gray-400 text-sm font-medium outline-none border-b-2 w-full"
        placeholder={placeholder}
        required
      />
    </Form.Control>
    <Form.Message className="text-red-600 text-lg" match="valueMissing">
      Please enter your {label}
    </Form.Message>
  </Form.Field>
))
