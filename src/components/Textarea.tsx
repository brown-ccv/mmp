import React, { useState } from "react"
import * as Form from "@radix-ui/react-form"

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string
  name: string
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ name, label, ...delegated }, ref) => {
    const [characterCount, setCharacterCount] = useState(0)
    const maxLength = 300

    return (
      <Form.Field name={name} className="relative flex flex-col gap-2">
        <Form.Label>{label}</Form.Label>
        <span className="px-2 py-1 text-xs text-neutral-300 rounded absolute top-9 right-1">
          {characterCount}/{maxLength}
        </span>
        <Form.Control asChild>
          <textarea
            rows={4}
            maxLength={maxLength}
            className="text-gray-400 text-sm font-medium outline-none border-b-2 w-full py-6"
            {...delegated}
            ref={ref}
            onChange={(e) => setCharacterCount(e.target.value.length)}
          />
        </Form.Control>
        <Form.Message className="text-primary-300 px-2" match="valueMissing">
          Please enter your {label}
        </Form.Message>
      </Form.Field>
    )
  }
)
