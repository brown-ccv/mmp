import { initializeApp } from "firebase/app"
import {
  EmailAuthProvider,
  getAuth,
  linkWithCredential,
  sendSignInLinkToEmail,
  signInWithEmailLink,
} from "firebase/auth"
import firebaseConfig from "./firebase-config.json"

// Initialize Firebase
export const app = initializeApp(firebaseConfig)

export const auth = getAuth()

// Magic link for auth
export const actionCodeSettings = {
  // URL you want to redirect back to. The domain (www.example.com) for this
  // URL must be in the authorized domains list in the Firebase Console.
  url: "http://localhost:4321/data",
  // This must be true.
  handleCodeInApp: true,
}

export const finishSignIn = async (email) => {
  // The client SDK will parse the code from the link for you.
  try {
    const result = await signInWithEmailLink(auth, email, window.location.href)
    window.localStorage.removeItem("emailForSignIn")
    const credential = EmailAuthProvider.credentialWithLink(email, window.location.href)
    await linkWithCredential(result.user, credential)
    return result.user
  } catch (error) {
    throw new Error(error)
  }
}
export const sendAuthenticateLink = async (email) => {
  try {
    const result = await sendSignInLinkToEmail(auth, email, actionCodeSettings)
    window.localStorage.setItem("emailForSignIn", email)
    return result
  } catch (error) {
    return error.message
  }
}
