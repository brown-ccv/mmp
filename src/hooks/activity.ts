import type { Timestamp } from "firebase/firestore"
import type { UserInfo } from "firebase/auth"
import { useEffect, useState } from "react"
import { getActivityData } from "../firebase"

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

export function useActivityData(user: UserInfo | null | undefined) {
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
