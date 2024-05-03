import React, { useState } from "react"
import DataTable from "../components/DataTable"
import DownloadModal from "../components/DownloadModal"

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
  const [fileList, setFileList] = useState<Array<string>>([])

  const updateFileList = (newArray: Array<string>) => {
    setFileList(newArray)
  }
  return (
    <div className="flex flex-col">
      <p>Download</p>
      <DataTable allFiles={allFiles} fileListFunction={updateFileList} />
      <DownloadModal filesToDownload={fileList} />
    </div>
  )
}
export default DataForm
