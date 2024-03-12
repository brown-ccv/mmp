import React from "react"
import * as Dialog from "@radix-ui/react-dialog"
import { Cross2Icon, DownloadIcon, PlusIcon } from "@radix-ui/react-icons"
import { CustomInput } from "./CustomInput.tsx"
import { CustomTextarea } from "./CustomTextarea.tsx"

const DownloadModal = () => {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Trigger asChild>
        <button className="sm:inline-flex items-center justify-center w-8 h-8 rounded-lg text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200">
          <DownloadIcon />
          <span className="sr-only">Download data</span>
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay
          className="fixed top-0 left-0 right-0 bottom-0 bg-gray-500 bg-opacity-75 transition-opacity z-10 w-screen overflow-y-auto"
          onClick={() => setIsOpen(false)}
        />
        <Dialog.Overlay className="fixed top-0 left-0 right-0 bottom-0 grid place-items-center z-10 w-screen overflow-y-auto">
          <Dialog.Content className="rounded-lg text-left shadow-xl max-h-fit transition-all bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4 sm:my-8 sm:w-full sm:max-w-lg">
            <div className="flex justify-end">
              <Dialog.Close className="text-gray-400 bg-transparent  rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center hover:bg-gray-200 hover:text-gray-900">
                <Cross2Icon />
                <span className="sr-only">Close</span>
              </Dialog.Close>
            </div>
            <Dialog.Title>Download Data</Dialog.Title>
            <form className="p-4 md:p-5">
              <div className="flex flex-col justify-center mb-4">
                <CustomInput label={"name"} placeholder={"Your name"} />
                <CustomInput label={"institution"} placeholder={"Your institution"} />
                <CustomInput label={"email"} placeholder={"Your email"} />
                <CustomTextarea label={"description"} placeholder={"Why you need this file"} />
              </div>
              <button
                type="submit"
                className="flex items-center gap-2 rounded-lg px-5 py-2.5 bg-black text-white text-sm text-center font-medium hover:bg-gray-500 focus:ring-4 focus:outline-none focus:ring-gray-500"
              >
                <PlusIcon />
                <span className="pt-1">Validate Email</span>
              </button>
            </form>
          </Dialog.Content>
        </Dialog.Overlay>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
export default DownloadModal
