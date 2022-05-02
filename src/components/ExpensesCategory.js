import React from 'react'
import Helmet from 'react-helmet'

import BtnRegresar from '../elements/BtnRegresar'
import { Categoria, ElementoListaCategorias, ListaDeCategorias, Valor } from './../elements/ListElements'
import { Header, Titulo } from '../elements/Header'
import { IconCategory } from '../elements/IconCategory'

import { useGetMExpensesByCategory } from '../hooks/useGetMExpensesByCategory'
import { moneyConverter } from '../helpers/moneyConverter'
import TotalBar from './TotalBar'

const ExpensesCategory = () => {
  const expensesByCategory = useGetMExpensesByCategory()
  
  return (
    <>
      <Helmet>
        <title>Gastos por categoria</title>
      </Helmet>

      <Header>
        <BtnRegresar ruta='/'/>
        <Titulo>Gastos por categoria</Titulo>
      </Header>

      <ListaDeCategorias>
        { expensesByCategory.map((element, index) => (
          <ElementoListaCategorias key={index}>
            <Categoria>
              <IconCategory id={element.category} />
              { element.category }
            </Categoria>
            <Valor>
              { moneyConverter(element.priceTotal) }
            </Valor>
          </ElementoListaCategorias>
        )) }
      </ListaDeCategorias>

      <TotalBar />
    </>
  )
}

export default ExpensesCategory