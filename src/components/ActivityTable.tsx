import React from "react"
import type { activityType } from "../hooks/activity.ts"

export interface ActivityTableProps {
  data: activityType[]
}

const ActivityTable: React.FC<ActivityTableProps> = ({ data }) => {
  return (
    <div className="no-scrollbar w-full overflow-x-scroll">
      <table className="border-spacing-2 w-full table-fixed">
        <thead>
          <tr className="bg-neutral-100 text-neutral-900 text-xl text-left">
            <th>Description</th>
            <th className="w-1/4">User</th>
            <th className="w-1/5">Download Date</th>
          </tr>
        </thead>

        <tbody>
          {data &&
            data.map(({ name, institution, email, description, date }, i) => {
              const stringDate = date.toDate().toDateString()
              return (
                <tr key={i} className="align-top">
                  <td>
                    <p>{description}</p>
                  </td>
                  <td>
                    <div>
                      <p className="text-neutral-900 text-lg font-semibold">{name}</p>
                      <p className="text-neutral-700 overflow-ellipsis  overflow-hidden italic">
                        {email}
                      </p>
                      <p className="small">{institution}</p>
                    </div>
                  </td>
                  <td>{stringDate}</td>
                </tr>
              )
            })}
        </tbody>
      </table>
    </div>
  )
}
export default ActivityTable
