import { useEffect, useState } from 'react'
import { startOfMonth, endOfMonth, getUnixTime } from 'date-fns'
import { collection, onSnapshot, orderBy, query, where } from 'firebase/firestore'
import { db } from '../firebase/firebaseConfig'
import { useAuth } from './useAuth'

export const useGetMonthlyExpenses = () => {
    const [monthlyExpenses, setMonthlyExpenses] = useState([])
    const { user } = useAuth() 

    useEffect(() => {
        const startDay = getUnixTime(startOfMonth(new Date()))
        const finalDay = getUnixTime(endOfMonth(new Date()))

        if(user){
            const customQuery = query(
                collection(db, 'expenses'),
                orderBy('date', 'desc'),
                where('date', '>=', startDay),
                where('date', '<=', finalDay),
                where('uidUser', '==', user.uid)
            )

            const unsuscribe = onSnapshot(customQuery, (snapshot) => {
                setMonthlyExpenses(snapshot.docs.map(document => (
                    { ...document.data(), id: document.id}
                )))
            })
            return unsuscribe
        }
    }, [user])


    return monthlyExpenses
}