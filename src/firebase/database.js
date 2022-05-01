import { addDoc, collection, deleteDoc, doc, getDoc, updateDoc } from 'firebase/firestore'
import { db } from './firebaseConfig'

export const addExpense = async ({ description, category, price, date, uidUser }) => {
    try {
        return await addDoc(collection(db, 'expenses'), {
            category,
            date,
            description,
            price: Number(price),
            uidUser
        })
    } catch (error) {
        console.log("Error adding document: ", error)
    }
}

export const deleteExpense = async ( id ) => {
    try {
        await deleteDoc(doc(db, 'expenses', id))
        console.log('Gasto borrado con éxito')
    } catch (error) {
        console.log('Hubo un error al intentar eliminar el gasto')
        console.log(error)
    }
}

export const updateExpense = async ({ id, category, description, price, date }) => {
    try {
        await updateDoc(doc(db, 'expenses', id), {
            category,
            date,
            description,
            price: Number(price)
        })
    } catch (error) {
        console.log('Hubo un error al intentar actualizar el gasto')
        console.log(error)
    }
}

export const readExpense = async ( id ) => {
    try {
        const dato = await getDoc(doc(db, 'expenses', id))
        console.log(dato)
    } catch (error) {
        console.log(error)
    }
}