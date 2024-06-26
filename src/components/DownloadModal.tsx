import React, { useState } from "react"
import * as Dialog from "@radix-ui/react-dialog"
import * as Form from "@radix-ui/react-form"
import { Cross2Icon, DownloadIcon, PlusIcon } from "@radix-ui/react-icons"
import { useForm, Controller, type SubmitHandler } from "react-hook-form"
import { CustomInput } from "./CustomInput.tsx"
import { CustomTextarea } from "./CustomTextarea.tsx"

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
        <button className="sm:inline-flex w-fit items-center rounded-lg text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200">
          <span>Download data</span>
          <DownloadIcon />
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay
          className="fixed top-0 left-0 right-0 bottom-0 bg-gray-500 bg-opacity-75 transition-opacity z-10 w-screen overflow-y-auto"
          onClick={() => setIsOpen(false)}
        />
        <Dialog.Overlay className="fixed top-0 left-0 right-0 bottom-0 grid place-items-center z-10 w-screen overflow-y-auto">
          <Dialog.Content className="flex flex-col gap-12 rounded-lg text-left shadow-xl max-h-fit transition-all bg-neutral-50 px-4 pb-4 pt-5 sm:p-6 sm:pb-4 sm:my-8 sm:w-full sm:max-w-lg">
            <div>
              <div className="flex justify-end">
                <Dialog.Close className="text-gray-400 bg-transparent rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center hover:bg-gray-200 hover:text-gray-900">
                  <Cross2Icon />
                  <span className="sr-only">Close</span>
                </Dialog.Close>
              </div>
              <Dialog.Title>Download Data</Dialog.Title>
              <p>
                By downloading these data, you agree to the <a href="#">usage guidelines</a>
              </p>
            </div>
            <Dialog.Title>Download Data:</Dialog.Title>
            <p>{message}</p>
            <Form.Root onSubmit={handleSubmit(onSubmit)}>
              <Controller
                name="name"
                control={control}
                render={() => (
                  <CustomInput label={"name"} placeholder={"Your name"} {...register("name")} />
                )}
              />
              <Controller
                name={"institution"}
                control={control}
                render={() => (
                  <CustomInput
                    label={"institution"}
                    placeholder={"Your institution"}
                    {...register("institution")}
                  />
                )}
              />
              <Controller
                name="email"
                control={control}
                render={() => (
                  <CustomInput
                    label={"email"}
                    placeholder={"Your email"}
                    match={"typeMismatch"}
                    errorMessage={"Please provide a valid email"}
                    {...register("email")}
                  />
                )}
              />
              <Controller
                name="description"
                control={control}
                render={() => (
                  <CustomTextarea
                    label={"description"}
                    placeholder={"Why you need this file"}
                    {...register("description")}
                  />
                )}
              />

              <Form.Submit
                className={`flex items-center gap-2 rounded-lg px-5 py-2.5 bg-black text-white text-sm text-center font-medium hover:bg-gray-500 focus:ring-4 focus:outline-none focus:ring-gray-500 disabled:bg-gray-400`}
              >
                <PlusIcon />
                <span className="pt-1">Validate Email</span>
              </Form.Submit>
              <Form.Field name="download">
                <Form.Control asChild>
                  <button
                    disabled
                    className="flex items-center gap-2 rounded-lg px-5 py-2.5 bg-black text-white text-sm text-center font-medium hover:bg-gray-500 focus:ring-4 focus:outline-none focus:ring-gray-500 disabled:bg-gray-400"
                  ></button>
                </Form.Control>
              </Form.Field>
            </Form.Root>
            {filesToDownload.map((file) => {
              const name = file.replace(/.+?(?=[^_]+$)/, "").replace(/\.[^.]*$/, "")

              return (
                <a className="p-2" key={file} href={file} download={file}>
                  {name.toUpperCase()}
                </a>
              )
            })}
          </Dialog.Content>
        </Dialog.Overlay>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
export default DownloadModal
