import { initializeApp } from "firebase/app"
import { addDoc, collection, getDocs, getFirestore, Timestamp } from "firebase/firestore"
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth"
import firebaseConfig from "./firebase-config.json"

const provider = new GoogleAuthProvider()
provider.setCustomParameters({
  hd: "brown.edu",
})

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
export const auth = getAuth(app)

export const addActivityData = async (inputs) => {
  try {
    const docRef = await addDoc(collection(db, "history"), {
      name: inputs.name,
      institution: inputs.institution,
      email: inputs.email,
      description: inputs.description,
      date: Timestamp.now(),
    })
    console.log("Document written with ID: ", docRef.id)
  } catch (e) {
    console.error("Error adding document: ", e)
  }
}

export const getAdminUsers = async () => {
  const querySnapshot = await getDocs(collection(db, "admin"))
  const data = []
  querySnapshot.forEach((doc) => {
    data.push(doc.data())
  })
  return data.map((user) => {
    return user.email
  })
}

export const getActivityData = async () => {
  const querySnapshot = await getDocs(collection(db, "history"))
  const data = []
  querySnapshot.forEach((doc) => {
    data.push(doc.data())
  })
  return data
}

export const handleLogin = async () => {
  try {
    const result = await signInWithPopup(auth, provider)
    const { email } = result.user
    const adminUsers = await getAdminUsers()
    if (!adminUsers.includes(email.toLowerCase())) {
      return null
    } else {
      return result.user
    }
  } catch (error) {
    console.log(error)
  }
}

export const handleLogout = async () => {
  try {
    await signOut(auth)
  } catch (error) {
    console.log(error)
  }
}
