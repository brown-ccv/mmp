import { useState } from "react"
import type { UserInfo } from "firebase/auth"
import { isAfter, subYears, toDate } from "date-fns"
import Login from "../components/Login"
import { useActivityData } from "../hooks/activity.ts"
import ActivityTable from "./ActivityTable.tsx"

const ActivityPage = () => {
  const [user, setUser] = useState<UserInfo | null | undefined>(null)
  const setUserFunction = (loggedUser: UserInfo | null | undefined) => {
    setUser(loggedUser)
  }
  const activityData = useActivityData(user)
  const yearlyActivityData = activityData?.filter((data) =>
    isAfter(toDate(data.date.toDate()), subYears(new Date(), 1))
  )

  return (
    <div className="space-y-8">
      <section className="space-y-6">
        <Login currentUser={user} setUserFunction={setUserFunction} />
        {!user && (
          <p>
            This section of the website is reserved for administrators to view download statistics.
          </p>
        )}
      </section>
      {user && activityData && (
        <section className="space-y-4">
          <div className="flex justify-between">
            <h3>
              <span className="px-2 font-bold">{activityData.length}</span> total download(s)
            </h3>
            {yearlyActivityData && (
              <h3>
                <span className="px-2 font-bold">{yearlyActivityData.length}</span> download(s) in
                the past year
              </h3>
            )}
          </div>
          <ActivityTable data={activityData} />
        </section>
      )}
    </div>
  )
}

export default ActivityPage
