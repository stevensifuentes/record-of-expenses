import { useEffect, useState } from 'react'
import { useGetMonthlyExpenses } from './useGetMExpenses'

export const useGetMExpensesByCategory = () => {
    const [expensesByCategory, setExpensesByCategory] = useState([])
    const expenses = useGetMonthlyExpenses()
  
    useEffect(() => {
        const sumExpenses = expenses.reduce((resultObject, currentObject) => {
            const currentCategory = currentObject.category
            const currentPrice = currentObject.price
            resultObject[currentCategory] += currentPrice
            return resultObject
        }, {
            'comida': 0,
            'cuentas y pagos': 0,
            'hogar': 0,
            'transporte': 0,
            'ropa': 0,
            'salud e higiene': 0,
            'compras': 0,
            'diversion': 0
        })
        setExpensesByCategory(Object.keys(sumExpenses).map(category => (
            { category, priceTotal: sumExpenses[category] }
        )))

    }, [expenses, setExpensesByCategory])
    
    return expensesByCategory
}
