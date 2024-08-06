import { useEffect, useState } from "react"
import type { UserInfo } from "firebase/auth"
import type { Timestamp } from "firebase/firestore"
import Login from "../components/Login"
import { getActivityData } from "../firebase"
import ActivityTable from "./ActivityTable.tsx"

export interface activityType {
  name: string
  institution: string
  email: string
  description: string
  date: Timestamp
}

const getData = async () => {
  return await getActivityData()
}

function useActivityData(user: UserInfo | null | undefined) {
  const [activityData, setActivityData] = useState<activityType[] | null>(null)
  useEffect(() => {
    if (user) {
      getData().then((data) => {
        setActivityData(data)
      })
    }
  }, [user])
  return activityData
}

const ActivityPage = () => {
  const [user, setUser] = useState<UserInfo | null | undefined>(null)
  const setUserFunction = (loggedUser: UserInfo | null | undefined) => {
    setUser(loggedUser)
  }
  const activityData = useActivityData(user)

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
        <section className="space-y-2">
          <h3>
            <span className="font-bold px-2">{activityData.length}</span> download(s)
          </h3>
          <ActivityTable data={activityData} />
        </section>
      )}
    </div>
  )
}

export default ActivityPage
