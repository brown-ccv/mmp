import { useEffect, useState } from "react"
import type { UserInfo } from "firebase/auth"
import Login from "../components/Login"
import { getHistoryData } from "../firebase"
import ActivityTable from "./ActivityTable.tsx"

const ActivityPage = () => {
  const [user, setUser] = useState<UserInfo | null | undefined>(null)
  const [historyData, setHistoryData] = useState<any[] | null>(null)
  const setUserFunction = (loggedUser: UserInfo | null | undefined) => {
    setUser(loggedUser)
  }

  useEffect(() => {
    const getData = async () => {
      return await getHistoryData()
    }

    if (user) {
      getData().then((data) => {
        setHistoryData(data)
      })
    }
  }, [user])

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
      {user && historyData && (
        <section className="space-y-2">
          <h3>
            <span className="font-bold px-2">{historyData.length}</span> download(s)
          </h3>
          <ActivityTable data={historyData} />
        </section>
      )}
    </div>
  )
}

export default ActivityPage
