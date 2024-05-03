import React from "react"
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
  return (
    <div className="flex flex-col">
      <p>Download</p>
      <DataTable allFiles={allFiles} />
      <DownloadModal />
    </div>
  )
}
export default DataForm
