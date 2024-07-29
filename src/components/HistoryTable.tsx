import React from "react"
import { type Timestamp } from "firebase/firestore"

export interface HistoryTableProps {
  data: Array<{
    name: string
    institution: string
    email: string
    description: string
    date: Timestamp
  }>
}

const HistoryTable: React.FC<HistoryTableProps> = ({ data }) => {
  return (
    <div className="w-full overflow-x-scroll no-scrollbar">
      <table className="table-fixed border-spacing-2">
        <thead>
          <tr className="bg-neutral-100 text-left text-neutral-900">
            <th>Name</th>
            <th>Institution</th>
            <th>Email</th>
            <th>Description</th>
            <th>Download Date</th>
          </tr>
        </thead>

        <tbody>
          {data &&
            data.map(({ name, institution, email, description, date }, i) => {
              const stringDate = date.toDate().toDateString()
              return (
                <tr key={i}>
                  <td>{name}</td>
                  <td>{institution}</td>
                  <td>{email}</td>
                  <td>{description}</td>
                  <td>{stringDate}</td>
                </tr>
              )
            })}
        </tbody>
      </table>
    </div>
  )
}
export default HistoryTable
