import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import WebFont from 'webfontloader'

import App from './App'
import Contenedor from './elements/Contenedor'
import Login from './components/Login'
import Signup from './components/Signup'
import ExpensesCategory from './components/ExpensesCategory'
import ExpenseList from './components/ExpenseList'
import EditExpense from './components/EditExpense'
// Work+Sans:wght@400;500;700

import favicon from './img/logo.png'
import './index.css'
import Fondo from './elements/Fondo'

WebFont.load({
  google: {
    families: ['Work Sans:400,500,700', 'sans-serif']
  }
})

const Index = () => {
  return (
    <>
      <Helmet>
        <link rel="shortcut icon" href={favicon} type="image/x-icon" />
      </Helmet>

      <BrowserRouter>
        <Contenedor>

          <Routes>
            <Route path='/' element={<App />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/categories' element={<ExpensesCategory />} />
            <Route path='/list' element={<ExpenseList />} />
            <Route path='/edit/:id' element={<EditExpense />} />
          </Routes>

        </Contenedor>
      </BrowserRouter>

      <Fondo />
    </>
  )
}

ReactDOM.render(<Index />, document.getElementById('root'))