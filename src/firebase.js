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
// TODO: move to modal --  const user = auth.currentUser

// Magic link for auth
export const actionCodeSettings = {
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

export const finishSignIn = async (email) => {
  // The client SDK will parse the code from the link for you.
  try {
    const result = await signInWithEmailLink(auth, email, window.location.href)
    window.localStorage.removeItem("emailForSignIn")
    if (result.additionalUserInfo.isNewUser) {
      await addUserFirestore(result.user)
    }
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
