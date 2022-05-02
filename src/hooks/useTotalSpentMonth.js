import { useContext } from 'react'
import { TotalSpentMonthContext } from '../context/TotalSpentMonthContext'

export const useTotalSpentMonth = () => {
  return useContext(TotalSpentMonthContext)
}