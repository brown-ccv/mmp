import React, { useState } from "react"
import * as Checkbox from "@radix-ui/react-checkbox"
import { CheckIcon } from "@radix-ui/react-icons"

export interface FileItem {
  title: string
  cat: string
  file: string
  description?: string
  selected: boolean
}

type updateFileListType = (fileToUpdate: FileItem, selection: boolean) => void

interface DataTableProps {
  allFiles: {
    title: string
    cat: string
    file: string
    description?: string
    selected: boolean
  }[]
  updateFileList: updateFileListType // function that updates file list in the parent component
}

const DataTable: React.FC<DataTableProps> = ({ allFiles, updateFileList }) => {
  const [isCheckAll, setIsCheckAll] = useState(false)

  const handleSelectAll = () => {
    const newIsCheckAll = !isCheckAll // Toggle isCheckAll
    setIsCheckAll(newIsCheckAll)
    allFiles.forEach((file) => {
      updateFileList(file, newIsCheckAll)
    })
  }

  const handleSelect = (selected: boolean, i: number) => {
    updateFileList(allFiles[i], !selected)
  }

  const selectedFiles = allFiles.map(({ title, file, selected, cat, description }, i) => {
    return (
      <tr key={i}>
        <td>
          <div className="flex items-center gap-4">
            <Checkbox.Root
              name={file}
              id={file}
              className="p-0 w-4 h-4 border"
              checked={selected}
              onClick={() => handleSelect(selected, i)}
            >
              <Checkbox.Indicator>
                <CheckIcon />
              </Checkbox.Indicator>
            </Checkbox.Root>
            <p className="text-base"> {title}</p>
          </div>
        </td>
        <td>{description}</td>
        <td>
          <a
            className="text-secondary-blue-700 hover:text-secondary-blue-500"
            target="_blank"
            href={file}
          >{`${title}.${file.split(".").pop()}`}</a>
        </td>
      </tr>
    )
  })

  return (
    <div className="w-full overflow-x-scroll no-scrollbar">
      <table className="table-fixed border-spacing-2">
        <thead>
          <tr className="bg-neutral-100 text-left text-neutral-900">
            <th className="flex items-center w-[200px]">
              <Checkbox.Root
                name="selectAll"
                id="selectAll"
                className="p-0 w-4 h-4 text-neutral-900 border"
                onCheckedChange={handleSelectAll}
              >
                <Checkbox.Indicator>
                  <CheckIcon />
                </Checkbox.Indicator>
              </Checkbox.Root>
              File Name
            </th>
            <th>Description</th>
            <th>File</th>
          </tr>
        </thead>

        <tbody>{selectedFiles}</tbody>
      </table>
    </div>
  )
}
export default DataTable
