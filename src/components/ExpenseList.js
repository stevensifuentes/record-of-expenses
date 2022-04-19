import React from 'react'
import Helmet from 'react-helmet'
import { Header, Titulo } from './../elements/Header'
import BtnRegresar from '../elements/BtnRegresar'

const ExpenseList = () => {
  return (
    <>
      <Helmet>
        <title>Lista de Gastos</title>
      </Helmet>

      <Header>
        <BtnRegresar ruta='list'/>
        <Titulo>Lista de gastos</Titulo>
      </Header>
    </>
  )
}

export default ExpenseList