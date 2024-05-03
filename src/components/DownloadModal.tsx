import React, { useEffect, useState } from "react"
import * as Dialog from "@radix-ui/react-dialog"
import * as Form from "@radix-ui/react-form"
import { Cross2Icon, DownloadIcon, PlusIcon } from "@radix-ui/react-icons"
import { useForm, Controller, type SubmitHandler } from "react-hook-form"
import { isSignInWithEmailLink, sendSignInLinkToEmail } from "firebase/auth"
import { auth, getDownloadUrl, actionCodeSettings, finishSignIn } from "../firebase"
import { CustomInput } from "./CustomInput.tsx"
import { CustomTextarea } from "./CustomTextarea.tsx"
import { CheckboxGroup } from "./CheckboxGroup.tsx"

export interface Inputs {
  name: string
  institution: string
  email: string
  description: string
  files: Array<string>
}

const DownloadModal = () => {
  const [isOpen, setIsOpen] = React.useState(false)
  const [downloadUrl, setDownloadUrl] = React.useState("")
  const [message, setMessage] = React.useState("")
  const [user, setUser] = useState(auth.currentUser)
  const { handleSubmit, control, register, setValue } = useForm<Inputs>()

  const options = [
    { value: "codebook_life", label: "LIFE" },
    {
      value: "codebook_pers",
      label: "PERS",
    },
    { value: "codebook_commun", label: "COMMUN" },
    { value: "codebook_mig", label: "MIG" },
    {
      value: "codebook_house",
      label: "HOUSE",
    },
    { value: "codebook_spouse", label: "SPOUSE" },
    { value: "codebook_pratio", label: "PRATIO" },
  ]

  useEffect(() => {
    // on load, check if user has validated email; set download url
    const getUser = async (email: any) => {
      setUser(await finishSignIn(email))
    }
    if (isSignInWithEmailLink(auth, window.location.href)) {
      // Additional state parameters can also be passed via URL.
      // This can be used to continue the user's intended action before triggering
      let email = window.localStorage.getItem("emailForSignIn")
      if (!email) {
        // User opened the link on a different device. To prevent session fixation
        // attacks, ask the user to provide the associated email again. For example:
        email = window.prompt("Please provide your email for confirmation")
      }
      try {
        getUser(email)
        const files = JSON.parse(window.localStorage.getItem("fileNameList") as string)
        console.log(files.length)
        if (user && user.emailVerified && files) {
          setIsOpen(true)
          const urls = files.map(async (fileName: string) => await getDownloadUrl(fileName))
          console.log(urls)
          setDownloadUrl(urls)

          // TODO: push data to history table if signed in
        }
      } catch (e) {
        const error = e as string
        setMessage(`Error: ${error}`)
      }
    }
  }, [])

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log(data)
    console.log(data.files)
    // send validation email
    try {
      const result = await sendSignInLinkToEmail(auth, data.email, actionCodeSettings)
      window.localStorage.setItem("emailForSignIn", data.email)
      window.localStorage.setItem("fileNameList", JSON.stringify(data.files))
      return result
    } catch (e) {
      const error = e as string
      setMessage(`Error: ${error}`)
    }
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
          <Dialog.Content className="rounded-lg text-left shadow-xl max-h-fit transition-all bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4 sm:my-8 sm:w-full sm:max-w-lg">
            <div className="flex justify-end">
              <Dialog.Close className="text-gray-400 bg-transparent  rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center hover:bg-gray-200 hover:text-gray-900">
                <Cross2Icon />
                <span className="sr-only">Close</span>
              </Dialog.Close>
            </div>
            <Dialog.Title>Download Data</Dialog.Title>
            <p>{message}</p>
            <Form.Root onSubmit={handleSubmit(onSubmit)}>
              <CheckboxGroup
                title={"Choose files to download:"}
                label={"files"}
                options={options}
                register={register}
                setValue={setValue}
              />
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

              <Form.Submit className="flex items-center gap-2 rounded-lg px-5 py-2.5 bg-black text-white text-sm text-center font-medium hover:bg-gray-500 focus:ring-4 focus:outline-none focus:ring-gray-500 disabled:bg-gray-400">
                <PlusIcon />
                <span className="pt-1">Validate Email</span>
              </Form.Submit>
              <Form.Field name="download">
                <Form.Control asChild>
                  <button
                    disabled
                    className="flex items-center gap-2 rounded-lg px-5 py-2.5 bg-black text-white text-sm text-center font-medium hover:bg-gray-500 focus:ring-4 focus:outline-none focus:ring-gray-500 disabled:bg-gray-400"
                  >
                    <a href={downloadUrl}>Download File</a>
                  </button>
                </Form.Control>
              </Form.Field>
            </Form.Root>
          </Dialog.Content>
        </Dialog.Overlay>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
export default DownloadModal
