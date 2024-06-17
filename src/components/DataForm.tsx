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

  return (
    <div className="flex flex-col">
      <DataTable allFiles={allFiles} updateFileList={(e) => setFileList(e)} />
      <DownloadModal filesToDownload={fileList} />
    </div>
  )
}
export default DataForm
