import { createContext, useEffect, useState } from 'react'
import { useGetMonthlyExpenses } from '../hooks/useGetMExpenses'

export const TotalSpentMonthContext = createContext()

export const TotalSpentMonthProvider = ({ children }) => {
    const [total, setTotal] = useState(0)
    const expenses = useGetMonthlyExpenses()    

    useEffect(() => {
        let accumulated = 0
        expenses.forEach((expense => {
            accumulated += expense.price
        }))
        setTotal(accumulated)
    }, [expenses])

    return (
        <TotalSpentMonthContext.Provider value={{ total }}>
            { children }
        </TotalSpentMonthContext.Provider>
    )
}