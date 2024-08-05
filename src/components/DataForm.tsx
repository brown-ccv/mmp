import { Controller, type SubmitHandler, useForm } from "react-hook-form"
import * as Form from "@radix-ui/react-form"
import { addHistoryData } from "../firebase"
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

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    await addHistoryData(data)
    window.location.assign("https://repository.library.brown.edu/studio/item/bdr:p54c6u36/")
  }
  return (
    <Form.Root
      className="p-6 rounded outline outline-neutral-100 outline-1 shadow-md space-y-4"
      onSubmit={handleSubmit(onSubmit)}
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
