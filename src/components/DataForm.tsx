import React, { useState } from "react"
import DataTable from "../components/DataTable"
import DownloadModal from "../components/DownloadModal"

export interface FileItem {
  title: string
  cat: string
  file: string
  description?: string
  selected: boolean
}

interface DataFormProps {
  allFiles: {
    data: {
      title: string
      cat: string
      file: string
      description?: string
    }
  }[]
}

const DataForm: React.FC<DataFormProps> = ({ allFiles }) => {
  const initialFiles = allFiles.map((file) => {
    const temp = file.data
    return { ...temp, selected: false }
  })
  const [files, setFiles] = useState(initialFiles)

  const updateFileList = (fileToUpdate: FileItem, selection: boolean) => {
    const filesClone = [...files]
    const updatedFiles = filesClone.map((file) => {
      if (file.file === fileToUpdate.file) {
        file.selected = selection
      }
      return file
    })
    setFiles(updatedFiles)
  }

  return (
    <div className="flex flex-col gap-4">
      <DownloadModal filesToDownload={files.map((file) => file.file)} />
      <DataTable allFiles={files} updateFileList={updateFileList} />
    </div>
  )
}
export default DataForm
