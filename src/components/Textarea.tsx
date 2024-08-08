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
        <span className="text-neutral-300 top-9 right-1 absolute px-2 py-1 text-xs rounded">
          {characterCount}/{maxLength}
        </span>
        <Form.Control asChild>
          <textarea
            rows={4}
            maxLength={maxLength}
            className="w-full py-6 text-sm font-medium text-gray-400 border-b-2 outline-none"
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
