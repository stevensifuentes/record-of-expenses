import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../firebase/firebaseConfig'

export const useGetExpenseById = (id) => {
    const navigate = useNavigate()
    const [expense, setExpense] = useState()

    useEffect(() => {
        const getExpense = async () => {
            const document = await getDoc(doc(db, 'expenses', id))
            if(document.exists()){
                setExpense(document)
            }else{
                navigate('/list')
            }
        }
        getExpense()

        return setExpense('')
    }, [id, navigate])
    

    return [expense]
}