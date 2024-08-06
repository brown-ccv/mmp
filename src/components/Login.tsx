import React, { useState } from "react"
import { type UserInfo } from "firebase/auth"
import { handleLogin, handleLogout } from "../firebase"
import Button from "./Button.tsx"

interface LoginProps {
  currentUser: UserInfo | null | undefined
  setUserFunction: (loggedUser: UserInfo | null | undefined) => void
}

const Login: React.FC<LoginProps> = ({ currentUser, setUserFunction }) => {
  const [message, setMessage] = useState("")

  const login = async () => {
    await handleLogin().then((loggedUser) => {
      if (!loggedUser)
        setMessage(
          "You must be an admin on this project in order to see this data. If you believe this to be an error, please reach out to David Lindstrom (david_lindstrom@brown.edu)."
        )
      setUserFunction(loggedUser)
    })
  }
  const logout = async () => {
    await handleLogout()
    setUserFunction(null)
    setMessage("")
  }
  return (
    <section className="flex flex-col gap-6">
      <div>
        {currentUser ? (
          <Button onClick={() => logout()}>Log Out</Button>
        ) : (
          <Button onClick={() => login()}>Log In</Button>
        )}
      </div>
      {message && <p className="font-semibold text-primary-300">{message}</p>}
    </section>
  )
}
export default Login
