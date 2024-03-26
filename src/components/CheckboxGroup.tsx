import * as inspector from "inspector"
import React, { useState } from "react"
import * as Checkbox from "@radix-ui/react-checkbox"
import * as Form from "@radix-ui/react-form"
import { CheckIcon } from "@radix-ui/react-icons"
import type { Path, UseFormRegister, UseFormSetValue } from "react-hook-form"
import type { Inputs } from "./DownloadModal.tsx"

interface options {
  label: string
  value: string
}

type CheckBoxProps = {
  title: string
  label: Path<Inputs>
  errorMessage?: string
  options: Array<options>
  register: UseFormRegister<Inputs>
  setValue: UseFormSetValue<Inputs>
  match?:
    | "valueMissing"
    | "badInput"
    | "patternMismatch"
    | "rangeOverflow"
    | "rangeUnderflow"
    | "stepMismatch"
    | "tooLong"
    | "tooShort"
    | "typeMismatch"
    | "valid"
}
export const CheckboxGroup = ({
  title,
  label,
  options,
  match,
  errorMessage,
  register,
  setValue,
}: CheckBoxProps) => {
  const fileArray: string | any[] = []

  const handleFileArray = (action: string, option: string) => {
    if (action === "add" && !fileArray.includes(option)) fileArray.push(option)
    else if (action === "remove" && fileArray.includes(option)) {
      const index = fileArray.indexOf(option)
      fileArray.splice(index, 1)
    }
    setValue(label, fileArray)
  }
  return (
    <Form.Field name={label} className="py-2 my-4 mx-2">
      <Form.Label>{title}</Form.Label>
      <Form.Control asChild>
        <input
          id={label}
          type={"text"}
          {...register(label)}
          onChange={(e) => {
            setValue(label, e.target.value)
          }}
          className="hidden"
          required
        />
      </Form.Control>

      {match !== undefined && (
        <>
          <Form.Message match={match}>{errorMessage}</Form.Message>
        </>
      )}
      {options.map((option) => {
        return (
          <div key={option.value} className="flex items-center">
            <Checkbox.Root
              name={label}
              id={option.value}
              onCheckedChange={(checked) => {
                if (checked) {
                  handleFileArray("add", option.value)
                } else {
                  handleFileArray("remove", option.value)
                }
              }}
              className="w-[24px] h-[24px] border-r-4 items-center justify-center shadow-md"
            >
              <Checkbox.Indicator>
                <CheckIcon />
              </Checkbox.Indicator>
            </Checkbox.Root>
            <label htmlFor={option.value}>{option.label}</label>
          </div>
        )
      })}
      <Form.Message className="text-red-600 text-lg" match="valueMissing">
        Please choose at least one of the {label}
      </Form.Message>
    </Form.Field>
  )
}
