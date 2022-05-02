import React, { useState } from 'react'
import Helmet from 'react-helmet'
import { Link } from 'react-router-dom'

import BtnRegresar from '../elements/BtnRegresar'
import { Boton } from '../elements/Boton'
import { Header, Titulo } from './../elements/Header'
import { IconCategory } from '../elements/IconCategory'
import {
  BotonAccion,
  BotonCargarMas,
  Categoria,
  ContenedorBotonCentral,
  ContenedorBotones,
  ContenedorSubtitulo,
  Descripcion,
  ElementoLista,
  Fecha,
  Lista,
  Subtitulo,
  Valor
} from '../elements/ListElements'

import { useGetExpenses } from '../hooks/useGetExpenses'
import { deleteExpense } from '../firebase/database'
import { formatDate } from '../helpers/formatDate'
import { moneyConverter } from '../helpers/moneyConverter'
import { ReactComponent as EditIcon } from './../img/editar.svg'
import { ReactComponent as DeleteIcon } from './../img/borrar.svg'
import TotalBar from './TotalBar'
import { Alerta } from '../elements/Alerta'

const ExpenseList = () => {
  const [expenses, moreToLoad, getMoreSpending] = useGetExpenses()
  const [estadoAlerta, setEstadoAlerta] = useState(false)
  const [alerta, setAlerta] = useState({})

  const dateIsEqual = (expenses, index, expense) => {
    // if(index!==0){
    //   const currentDate = formatDate(expense.date)
    //   const previusDate = formatDate(expenses[index - 1].date)
    //   if(currentDate===previusDate){
    //     return true
    //   }else {
    //     return false
    //   }
    // }
    return index!==0 && formatDate(expense.date)===formatDate(expenses[index - 1].date)
  }

  const deleteExp = (id) => {
    deleteExpense(id)
    setEstadoAlerta(true)
    setAlerta({
      tipo: 'exito',
      mensaje: 'Gasto removido de la lista'
    })
  }

  return (
    <>
      <Helmet>expense
        <title>Lista de Gastos</title>
      </Helmet>

      <Header>
        <BtnRegresar ruta='/' />
        <Titulo>Lista de gastos</Titulo>
      </Header>

      <Lista>
        {expenses.map((expense, index) => (
          <div key={expense.id}>
            { !dateIsEqual(expenses, index, expense) && <Fecha>{ formatDate(expense.date) }</Fecha> }
            <ElementoLista>
              <Categoria>
                <IconCategory id={expense.category} />
                {expense.category}
              </Categoria>
              <Descripcion> 
                {expense.description}
              </Descripcion>
              <Valor>
                {moneyConverter(expense.price)}
              </Valor>
              <ContenedorBotones>
                <BotonAccion as={Link} to={`/edit/${expense.id}`}>
                  <EditIcon />
                </BotonAccion>
                <BotonAccion onClick={() => deleteExp(expense.id)}>
                  <DeleteIcon />
                </BotonAccion>
              </ContenedorBotones>
            </ElementoLista>
          </div>
        ))}

        {moreToLoad && 
          <ContenedorBotonCentral>
            <BotonCargarMas onClick={() => getMoreSpending()}>Cargar Más</BotonCargarMas>
          </ContenedorBotonCentral>
        }

        {expenses.length === 0 &&
          <ContenedorSubtitulo>
            <Subtitulo>No hay gastos por mostrar</Subtitulo>
            <Boton as={Link} to='/'>Agregar gasto</Boton>
          </ContenedorSubtitulo>
        }
      </Lista>
      <TotalBar />

      <Alerta
        tipo={alerta.tipo}
        mensaje={alerta.mensaje}
        estadoAlerta={estadoAlerta}
        setEstadoAlerta={setEstadoAlerta}
      />
    </>
  )
}

export default ExpenseList