import React from 'react'
import Helmet from 'react-helmet'
import { useParams } from 'react-router-dom'
import BtnRegresar from '../elements/BtnRegresar'
import { Header, Titulo } from '../elements/Header'
import { useGetExpenseById } from '../hooks/useGetExpenseById'
import ExpenseForm from './ExpenseForm'
import TotalBar from './TotalBar' 

const EditExpense = () => {
  const { id } = useParams()
  const [expense] = useGetExpenseById(id)

  return (
    <>
      <Helmet>
        <title>Editar gasto</title>
      </Helmet>

      <Header>
        <BtnRegresar ruta='/list'/>
        <Titulo>Editar gasto</Titulo>
      </Header>

      <ExpenseForm expense={expense} />
      <TotalBar />
    </>
  )
}

export default EditExpense