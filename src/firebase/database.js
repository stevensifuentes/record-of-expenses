import { addDoc, collection } from "firebase/firestore"
import { db } from "./firebaseConfig"

export const addExpense = async ({ description, category, price, date, uidUser }) => {
    try {
        return await addDoc(collection(db, 'expenses'), {
            category,
            description,
            price,
            date,
            uidUser
        })
    } catch (error) {
        console.log("Error adding document: ", error)
    }
}