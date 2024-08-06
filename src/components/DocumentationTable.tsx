import React from "react"

interface DocumentationTableProps {
  allFiles: {
    data: {
      title: string
      cat: string
      file?: string
      archivo?: string
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
      <table className="table-fixed border-spacing-4 w-full">
        <thead>
          <tr className="text-xl bg-neutral-100 text-left text-neutral-900">
            <th className="w-1/4">File</th>
            <th>Description</th>
            {version && <th className="w-1/5">Field Season</th>}
          </tr>
        </thead>

        <tbody>
          {files.map(({ title, file, description, version, archivo }, i) => {
            return (
              <tr key={i}>
                <td className="flex justify-between gap-2">
                  <p className="font-bold">{title}</p>
                  <div className="flex">
                    (
                    {file && (
                      <a
                        className="text-secondary-blue-700 hover:text-secondary-blue-500"
                        target="_blank"
                        href={file}
                      >
                        en
                      </a>
                    )}
                    {file && archivo && <p>/</p>}
                    {archivo && (
                      <a
                        className="text-secondary-blue-700 hover:text-secondary-blue-500"
                        target="_blank"
                        href={archivo}
                      >
                        es
                      </a>
                    )}
                    )
                  </div>
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
