import { initializeApp } from "firebase/app"
import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore"
import {
  getAuth,
  isSignInWithEmailLink,
  sendSignInLinkToEmail,
  signInWithEmailLink,
} from "firebase/auth"
import { getDownloadURL, getStorage, ref } from "firebase/storage"
import firebaseConfig from "./firebase-config.json"

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app)
const auth = getAuth()
const storage = getStorage()
const user = auth.currentUser

// Magic link for auth
const actionCodeSettings = {
  // URL you want to redirect back to. The domain (www.example.com) for this
  // URL must be in the authorized domains list in the Firebase Console.
  url: "https://mmp-site-b1c9b.web.app/finishSignUp",
  // This must be true.
  handleCodeInApp: true,
  iOS: {
    bundleId: "com.example.ios",
  },
  android: {
    packageName: "com.example.android",
    installApp: true,
    minimumVersion: "12",
  },
  dynamicLinkDomain: "example.page.link",
}

export const addUserFirestore = async (user) => {
  // check if user exists; if not, add them to db
  const userRef = doc(db, "users", user.uid)
  const userSnap = await getDoc(userRef)
  if (!userSnap.exists()) {
    await setDoc(doc(db, "users", user.uid), {
      email: user.email,
    })
  }
}

// Check the link is a sign-in with email link
if (isSignInWithEmailLink(auth, window.location.href)) {
  // Additional state parameters can also be passed via URL.
  // This can be used to continue the user's intended action before triggering
  let email = window.localStorage.getItem("emailForSignIn")
  if (!email) {
    // User opened the link on a different device. To prevent session fixation
    // attacks, ask the user to provide the associated email again. For example:
    email = window.prompt("Please provide your email for confirmation")
  }
  // The client SDK will parse the code from the link for you.
  try {
    const result = await signInWithEmailLink(auth, email, window.location.href)
    window.localStorage.removeItem("emailForSignIn")
    if (result.additionalUserInfo.isNewUser) {
      await addUserFirestore(result.user)
    }
  } catch (error) {
    return error.message
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
  const lifeRef = ref(storage, `MMP174/${fileName}.pdf`)

  try {
    return await getDownloadURL(lifeRef)
  } catch (error) {
    throw new Error(error)
  }
}
