import React from "react"

interface DocumentationTableProps {
  allFiles: {
    data: {
      title: string
      cat: string
      file: string
      description?: string
      version?: string
    }
  }[]
  version?: boolean
}

const DocumentationTable: React.FC<DocumentationTableProps> = ({ allFiles, version }) => {
  const files = allFiles.map((file) => {
    return { ...file.data }
  })
  return (
    <div className="w-full overflow-x-scroll no-scrollbar">
      <table className="table-fixed border-spacing-2">
        <thead>
          <tr className="bg-neutral-100 text-left text-neutral-900">
            <th className="flex items-center w-[200px]">File</th>
            <th>Description</th>
            {version && <th>Field Season</th>}
          </tr>
        </thead>

        <tbody>
          {files.map(({ title, file, description, version }, i) => {
            return (
              <tr key={i}>
                <td>
                  <a
                    className="text-secondary-blue-700 hover:text-secondary-blue-500"
                    target="_blank"
                    href={file}
                  >
                    {title}
                  </a>
                </td>
                <td>{description}</td>
                {version && <td>{version}</td>}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
export default DocumentationTable
