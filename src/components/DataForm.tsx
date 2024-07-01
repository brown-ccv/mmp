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
  const [files, setFiles] = useState(
    allFiles.map((file) => {
      return { ...file.data, selected: false }
    })
  )

  /**
   * Given a target file name and new `selected` field for that file, update the matching file object in{@link files}
   * with the new value for `selected`.
   */
  const updateFileList = ({ file: targetFile }: FileItem, selection: boolean) => {
    const updatedFiles = files.map(({ file, selected, ...rest }) => {
      return file === targetFile
        ? { file, selected: selection, ...rest }
        : { file, selected, ...rest }
    })

    setFiles(updatedFiles)
  }

  return (
    <div className="space-y-4">
      <DownloadModal filesToDownload={files.map((file) => file.file)} />
      <DataTable allFiles={files} updateFileList={updateFileList} />
    </div>
  )
}
export default DataForm
