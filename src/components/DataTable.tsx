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
              className="w-4 h-4 p-0 border"
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
        <td>{cat}</td>
        <td>{description}</td>
        <td>
          <a
            className="text-secondary-blue-700 hover:text-secondary-blue-500"
            target="_blank"
            href={file}
          >{`${title}.pdf`}</a>
        </td>
      </tr>
    )
  })

  return (
    <div className="no-scrollbar w-full overflow-x-scroll">
      <table className="border-spacing-2 table-fixed">
        <thead>
          <tr className="bg-neutral-100 text-neutral-900 text-left">
            <th className="flex items-center w-[200px]">
              <Checkbox.Root
                name="selectAll"
                id="selectAll"
                className="text-neutral-900 w-4 h-4 p-0 border"
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
            <th>File</th>
          </tr>
        </thead>

        <tbody>{selectedFiles}</tbody>
      </table>
    </div>
  )
}
export default DataTable
