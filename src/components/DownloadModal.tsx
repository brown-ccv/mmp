import React, { useState } from "react"
import * as Dialog from "@radix-ui/react-dialog"
import * as Form from "@radix-ui/react-form"
import { Cross2Icon, DownloadIcon, PlusIcon } from "@radix-ui/react-icons"
import { useForm, Controller, type SubmitHandler } from "react-hook-form"
import { CustomTextarea } from "./Textarea.tsx"
import Button from "./Button.tsx"
import { Input } from "./Input.tsx"

export interface Inputs {
  name: string
  institution: string
  email: string
  description: string
  files: Array<string>
}

interface DownloadModalProps {
  filesToDownload: Array<string>
}

const DownloadModal: React.FC<DownloadModalProps> = ({ filesToDownload }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [message, setMessage] = useState("")
  const { handleSubmit, control, register, setValue } = useForm<Inputs>()

  const onSubmit: SubmitHandler<Inputs> = async () => {
    // TODO: authentication check
    setValue("files", filesToDownload)
    setMessage("Checking if signed in")

    // TODO: push data to history table if signed in
  }

  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Trigger asChild>
        <Button icon={<DownloadIcon />}>
          <span>Download data</span>
        </Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay
          className="fixed top-0 left-0 right-0 bottom-0 bg-neutral-500 bg-opacity-75 transition-opacity z-10 w-screen overflow-y-auto"
          onClick={() => setIsOpen(false)}
        />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 max-h-[85vh] z-10 space-y-8 rounded-lg shadow-xl bg-neutral-50 p-9 overflow-y-auto">
          <div>
            <div className="flex justify-end">
              <Dialog.Close className="text-neutral-900 p-0 inline-flex justify-center items-center hover:bg-neutral-50 hover:shadow-none">
                <Cross2Icon width={28} height={28} />
                <span className="sr-only">Close</span>
              </Dialog.Close>
            </div>
            <div className="space-y-4">
              <Dialog.Title>Download Data</Dialog.Title>
              <p>
                By downloading these data, you agree to the <a href="#">usage guidelines</a>
              </p>
            </div>
          </div>
          <Form.Root className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            {message ? <p>{message}</p> : null}
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
                <CustomTextarea
                  label="Description"
                  placeholder="Why you need this file..."
                  {...register("description")}
                  required
                />
              )}
            />

            <Form.Submit asChild>
              <Button icon={<PlusIcon />}>
                <span>Validate Email</span>
              </Button>
            </Form.Submit>
            {/* <Form.Field name="download">
                <Form.Control asChild>
                  <Button
                    className="flex items-center gap-2 rounded-lg px-5 py-2.5 bg-black text-white text-sm text-center font-medium hover:bg-gray-500 focus:ring-4 focus:outline-none focus:ring-gray-500 disabled:bg-gray-400"
                    disabled
                  ></Button>
                </Form.Control>
              </Form.Field> */}
          </Form.Root>
          {/* {filesToDownload.map((file) => {
              const name = file.replace(/.+?(?=[^_]+$)/, "").replace(/\.[^.]*$/, "")

              return (
                <a className="p-2" key={file} href={file} download={file}>
                  {name.toUpperCase()}
                </a>
              )
            })} */}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
export default DownloadModal
