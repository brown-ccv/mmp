import React from "react"
import * as Form from "@radix-ui/react-form"

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string
  name: string
}

export const CustomTextarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ name, label, ...delegated }, ref) => (
    <Form.Field name={name} className="flex flex-col gap-2">
      <Form.Label>{label}</Form.Label>
      <Form.Control asChild>
        <textarea
          rows={4}
          className="text-gray-400 text-sm font-medium outline-none border-b-2 w-full"
          {...delegated}
          ref={ref}
        />
      </Form.Control>
      <Form.Message className="text-primary-300" match="valueMissing">
        Please enter your {label}
      </Form.Message>
    </Form.Field>
  )
)
