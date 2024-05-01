import React, { useState } from "react"
import * as Checkbox from "@radix-ui/react-checkbox"
import { CheckIcon } from "@radix-ui/react-icons"

interface DataTableProps {
  allFiles: {
    data: {
      title: string
      cat: string
      file: string
      description?: string
    }
  }[]
}

const DataTable: React.FC<DataTableProps> = ({ allFiles }) => {
  const [isCheckAll, setIsCheckAll] = useState(false)
  const [isCheck, setIsCheck] = useState<string[]>([])

  const handleSelectAll = () => {
    const newIsCheckAll = !isCheckAll // Toggle isCheckAll
    setIsCheckAll(newIsCheckAll)

    if (newIsCheckAll && allFiles) {
      // If select all is checked, set isCheck to all file values
      setIsCheck(allFiles.map((file) => file.data.file))
    } else {
      // If select all is unchecked, clear isCheck
      setIsCheck([])
    }
  }

  const handleSelect = (value: string) => {
    setIsCheck((prevIsCheck) => {
      if (prevIsCheck.includes(value)) {
        // Remove the item from the state if it's already checked
        return prevIsCheck.filter((item) => item !== value)
      } else {
        // Add the item to the state if it's not checked
        return [...prevIsCheck, value]
      }
    })
  }

  const selectedFiles = allFiles.map(({ data }) => {
    return (
      <tr key={data.file}>
        <td className="p-2">
          <div className="flex">
            <Checkbox.Root
              name={data.file}
              id={data.file}
              className="mx-1 w-[24px] h-[24px] border"
              checked={isCheck.includes(data.file)}
              onClick={() => handleSelect(data.file)}
            >
              <Checkbox.Indicator>
                <CheckIcon />
              </Checkbox.Indicator>
            </Checkbox.Root>
            <p className="text-base"> {data.title}</p>
          </div>
        </td>
        <td className="p-2">{data.cat}</td>
        <td className="p-2">{data.description}</td>
      </tr>
    )
  })

  return (
    <table className="table-fixed border-spacing-2">
      <thead>
        <tr className="bg-neutral-300 text-left">
          <th className="flex w-[200px]">
            <Checkbox.Root
              name="selectAll"
              id="selectAll"
              className="mx-1 w-[24px] h-[24px] text-neutral-900"
              onCheckedChange={handleSelectAll}
            >
              <Checkbox.Indicator>
                <CheckIcon />
              </Checkbox.Indicator>
            </Checkbox.Root>
            File Name
          </th>
          <th className="w-[200px]">Category</th>
          <th>Description</th>
        </tr>
      </thead>

      <tbody>{selectedFiles}</tbody>
    </table>
  )
}
export default DataTable
