import { useEffect, useState } from 'react'
import { 
    collection, 
    limit, 
    onSnapshot, 
    orderBy, 
    query, 
    startAfter, 
    where } from 'firebase/firestore'
import { db } from '../firebase/firebaseConfig'
import { useAuth } from './useAuth'

export const useGetExpenses = () => {
    const [expenses, setExpenses] = useState([])
    const [lastExpense, setLastExpense] = useState(null)
    const [moreToLoad, setMoreToLoad] = useState(false)
    const { user } = useAuth()

    const getMoreSpending = () => {
        const customQuery = query(
            collection(db, 'expenses'),
            where('uidUser', '==', user.uid),
            orderBy('date', 'desc'),
            limit(10),
            startAfter(lastExpense),
        )

        onSnapshot(customQuery, (snapshot) => {
            if(snapshot.docs.length>0){
                setLastExpense(snapshot.docs[snapshot.docs.length - 1])
                setExpenses(expenses.concat(snapshot.docs.map(expense => (
                    { ...expense.data(), id: expense.id }
                ))))
            }else {
                setMoreToLoad(false)
            }
        }, error => { console.log(error) })
    }

    useEffect(() => {
        const customQuery = query(
            collection(db, 'expenses'),
            where('uidUser', '==', user.uid),
            orderBy('date', 'desc'),
            limit(10)
        )

        const unsuscribe = onSnapshot(customQuery, (snapshot) => {
            if(snapshot.docs.length>0){
                setLastExpense(snapshot.docs[snapshot.docs.length - 1])
                setMoreToLoad(true)
            }else{
                setMoreToLoad(false)
            }

            setExpenses(snapshot.docs.map((expense) => (
                { ...expense.data(), id: expense.id }
            )))
        })
        return unsuscribe
    }, [user])

    return [expenses, moreToLoad, getMoreSpending]
}