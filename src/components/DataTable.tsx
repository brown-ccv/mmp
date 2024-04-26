import { useState } from "react"
import { useForm } from "react-hook-form"
import * as Checkbox from "@radix-ui/react-checkbox"
import { CheckIcon } from "@radix-ui/react-icons"

const DataTable = () => {
  const files = [
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
  const [isCheckAll, setIsCheckAll] = useState(false)
  const [isCheck, setIsCheck] = useState([])

  const handleSelectAll = () => {
    const newIsCheckAll = !isCheckAll // Toggle isCheckAll
    setIsCheckAll(newIsCheckAll)

    if (newIsCheckAll) {
      // If select all is checked, set isCheck to all file values
      setIsCheck(files.map((file) => file.value))
    } else {
      // If select all is unchecked, clear isCheck
      setIsCheck([])
    }
  }

  const handleSelect = (e: { target: any }) => {
    const checkedItem = e.target
    setIsCheck([...isCheck, checkedItem.id])
    if (checkedItem.getAttribute("data-state") == "checked") {
      setIsCheck(isCheck.filter((item) => item !== checkedItem.id))
    }
  }

  const selectedFiles = files.map(({ label, value }) => {
    return (
      <tr key={value}>
        <td className="flex py-1">
          <Checkbox.Root
            name={label}
            id={value}
            className="mx-1 w-[24px] h-[24px] border"
            checked={isCheck.includes(value)}
            onClick={handleSelect}
          >
            <Checkbox.Indicator>
              <CheckIcon />
            </Checkbox.Indicator>
          </Checkbox.Root>
          {label}
        </td>
        <td>{value}</td>
        <td>Test Description</td>
      </tr>
    )
  })

  return (
    <table className="min-w-full">
      <thead>
        <tr className="bg-neutral-300 text-left">
          <th className="flex">
            <Checkbox.Root
              name="selectAll"
              id="selectAll"
              className="mx-1 w-[24px] h-[24px]"
              onCheckedChange={handleSelectAll}
            >
              <Checkbox.Indicator>
                <CheckIcon />
              </Checkbox.Indicator>
            </Checkbox.Root>
            File Name
          </th>
          <th>Category</th>
          <th>Description</th>
        </tr>
      </thead>

      <tbody>{selectedFiles}</tbody>
    </table>
  )
}
export default DataTable
