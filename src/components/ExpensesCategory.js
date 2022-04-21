import React from 'react'
import Helmet from 'react-helmet'
import BtnRegresar from '../elements/BtnRegresar'
import { Header, Titulo } from '../elements/Header'

const ExpensesCategory = () => {
  return (
    <>
      <Helmet>
        <title>Gastos por categoria</title>
      </Helmet>

      <Header>
        <BtnRegresar ruta='/'/>
        <Titulo>Gastos por categoria</Titulo>
      </Header>
    </>
  )
}

export default ExpensesCategory