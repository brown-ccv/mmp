import React from "react"
import type { activityType } from "../hooks/activity.ts"

export interface ActivityTableProps {
  data: activityType[]
}

const ActivityTable: React.FC<ActivityTableProps> = ({ data }) => {
  return (
    <div className="w-full overflow-x-scroll no-scrollbar">
      <table className="table-fixed border-spacing-2 w-full">
        <thead>
          <tr className="text-xl bg-neutral-100 text-left text-neutral-900">
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
                <tr key={i}>
                  <td>
                    <p>{description}</p>
                  </td>
                  <td>
                    <div>
                      <p className="text-lg font-semibold text-neutral-900">{name}</p>
                      <p className="text-neutral-700 italic overflow-hidden overflow-ellipsis ">
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
