import { initializeApp } from "firebase/app"
import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore"
import {
  EmailAuthProvider,
  getAuth,
  linkWithCredential,
  sendSignInLinkToEmail,
  signInWithEmailLink,
} from "firebase/auth"
import { getDownloadURL, getStorage, ref } from "firebase/storage"
import firebaseConfig from "./firebase-config.json"

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app)
export const auth = getAuth()
const storage = getStorage()

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
export const getDownloadUrl = async (fileName) => {
  // TODO: loop over parameter list and then return array
  const fileRef = ref(storage, `MMP174/${fileName}.pdf`)

  try {
    return await getDownloadURL(fileRef)
  } catch (error) {
    throw new Error(error)
  }
}
