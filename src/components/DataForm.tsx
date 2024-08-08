import { Controller, type SubmitHandler, useForm } from "react-hook-form"
import * as Form from "@radix-ui/react-form"
import React from "react"
import { addActivityData } from "../firebase"
import { Input } from "./Input.tsx"
import { Textarea } from "./Textarea.tsx"
import Button from "./Button.tsx"

export interface Inputs {
  name: string
  institution: string
  email: string
  description: string
}

const DataForm = () => {
  const { handleSubmit, control, register } = useForm<Inputs>()
  const formRef = React.useRef<HTMLFormElement>(null)
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    await addActivityData(data)
    if (formRef.current) formRef.current.submit()
  }
  return (
    <Form.Root
      ref={formRef}
      className="outline outline-neutral-100 outline-1 p-6 space-y-4 rounded shadow-md"
      onSubmit={handleSubmit(onSubmit)}
      action="https://repository.library.brown.edu/studio/item/bdr:p54c6u36/"
      target="_blank"
      method="GET"
    >
      <Controller
        name="name"
        control={control}
        render={() => (
          <Input label="Name" placeholder="Heather Yu" {...register("name")} required />
        )}
      />
      <Controller
        name="institution"
        control={control}
        render={() => (
          <Input
            label="Institution"
            placeholder="Brown University"
            {...register("institution")}
            required
          />
        )}
      />
      <Controller
        name="email"
        control={control}
        render={() => (
          <Input
            label="Email"
            placeholder="heather@example.com"
            match="typeMismatch"
            errorMessage="Please provide a valid email"
            {...register("email")}
            required
          />
        )}
      />
      <Controller
        name="description"
        control={control}
        render={() => (
          <Textarea
            label="Description"
            placeholder="Why you need this file..."
            {...register("description")}
            required
          />
        )}
      />

      <Form.Submit asChild>
        <Button>
          <span>Submit</span>
        </Button>
      </Form.Submit>
    </Form.Root>
  )
}

export default DataForm
