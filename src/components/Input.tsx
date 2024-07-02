import * as Form from "@radix-ui/react-form"
import React, { type ReactNode } from "react"

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  name: string
  icon?: ReactNode
  match?: Form.FormMessageProps["match"]
  errorMessage?: string
}

// input,
// select {
//   @apply bg-white;
//   @apply rounded-full;
//   @apply shadow-inner;
//   @apply min-w-60;
//   @apply w-max;
//   @apply py-3;
//   @apply px-5;
// }

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, name, icon, match, errorMessage, ...delegated }: InputProps, ref) => {
    return (
      <Form.Field name={name} className="flex flex-col gap-2">
        <Form.Label>{label}</Form.Label>
        <Form.Control asChild>
          <div className="flex items-center gap-2 bg-white rounded-full shadow-inner min-w-60 w-max py-3 px-5 focus-within:shadow-inner-focus">
            <span className="text-neutral-300 w-5 h-5">{icon}</span>
            <input {...delegated} ref={ref} />
          </div>
        </Form.Control>
        <Form.Message className="text-primary-300" match="valueMissing">
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
)
