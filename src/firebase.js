import { initializeApp } from "firebase/app"
import { getFirestore, addDoc, collection } from "firebase/firestore"
import firebaseConfig from "./firebase-config.json"

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

export const addHistoryData = async (inputs) => {
  try {
    const docRef = await addDoc(collection(db, "history"), {
      name: inputs.name,
      institution: inputs.institution,
      email: inputs.email,
      description: inputs.description,
      date: new Date(),
    })
    console.log("Document written with ID: ", docRef.id)
  } catch (e) {
    console.error("Error adding document: ", e)
  }
}
