import React from "react"
import * as Dialog from "@radix-ui/react-dialog"
import { Cross2Icon } from "@radix-ui/react-icons"
import { CustomInput } from "./CustomInput.tsx"
import { CustomTextarea } from "./CustomTextarea.tsx"

const DownloadModal = () => {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Trigger asChild>
        <button className="hidden sm:inline-flex items-center justify-center text-gray-500 w-8 h-8 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 rounded-lg text-sm">
          <svg
            className="w-3.5 h-3.5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 16 18"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M8 1v11m0 0 4-4m-4 4L4 8m11 4v3a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-3"
            ></path>
          </svg>
          <span className="sr-only">Download data</span>
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity z-10 w-screen overflow-y-auto"
          onClick={() => setIsOpen(false)}
        />
        <Dialog.Content className="fixed inset-0 top-0 z-20 transform overflow-hidden rounded-lg text-left shadow-xl max-h-fit transition-all sm:my-8 sm:w-full sm:max-w-lg bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
          <Dialog.Close asChild>
            <button
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
              aria-label="Close"
              onClick={() => setIsOpen(false)}
            >
              <Cross2Icon />
            </button>
          </Dialog.Close>
          <Dialog.Title className="DialogTitle">Download Data</Dialog.Title>
          <form className="p-4 md:p-5">
            <div className="flex flex-col justify-center mb-4">
              <CustomInput label={"name"} placeholder={"Your name"} />
              <CustomInput label={"institution"} placeholder={"Your institution"} />
              <CustomInput label={"email"} placeholder={"Your email"} />
              <CustomTextarea label={"description"} placeholder={"Why you need this file"} />
            </div>
            <button
              type="submit"
              className="text-white inline-flex items-center bg-black hover:bg-gray-500 focus:ring-4 focus:outline-none focus:ring-gray-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              <svg
                className="me-1 -ms-1 w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                  clipRule="evenodd"
                ></path>
              </svg>
              Validate Email
            </button>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
export default DownloadModal
