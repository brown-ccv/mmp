import { useEffect, useState } from "react"
import type { UserInfo } from "firebase/auth"
import Login from "../components/Login"
import HistoryTable from "../components/HistoryTable"
import { getHistoryData } from "../firebase"

const HistoryPage = () => {
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
      <section>
        <div className="flex justify-end">
          <Login currentUser={user} setUserFunction={setUserFunction} />
        </div>
        {!user && (
          <p>
            This section of the website is reserved for administrators to view download statistics.
          </p>
        )}
      </section>
      {historyData && (
        <section className="space-y-2">
          <p>Number of downloads: {historyData.length}</p>
          <HistoryTable data={historyData} />
        </section>
      )}
    </div>
  )
}

export default HistoryPage
