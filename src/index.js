import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import WebFont from 'webfontloader'

import App from './App'
import Contenedor from './elements/Contenedor'
import EditExpense from './components/EditExpense'
import ExpensesCategory from './components/ExpensesCategory'
import ExpenseList from './components/ExpenseList'
import PrivateRoute from './components/PrivateRoute'
import Login from './components/Login'
import Signup from './components/Signup'

import { AuthProvider } from './context/AuthContext'
import favicon from './img/logo.png'
import Fondo from './elements/Fondo'
import './index.css'

WebFont.load({
  // Work+Sans:wght@400;500;700
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

      <AuthProvider>
        <BrowserRouter>
          <Contenedor>

            <Routes>
              {/* Public routes */}
              <Route path='/login' element={<Login />} />
              <Route path='/signup' element={<Signup />} />
              
              {/* Private routes */}
              <Route path='/' element={
                <PrivateRoute>
                  <App />
                </PrivateRoute>
              } />

              <Route path='/categories' element={
                <PrivateRoute>
                  <ExpensesCategory />
                </PrivateRoute>
              } />

              <Route path='/list' element={
                <PrivateRoute>
                  <ExpenseList />
                </PrivateRoute>
              } />

              <Route path='/edit/:id' element={
                <PrivateRoute>
                  <EditExpense />
                </PrivateRoute>
              } />
              
            </Routes>

          </Contenedor>
        </BrowserRouter>
      </AuthProvider>

      <Fondo />
    </>
  )
}

ReactDOM.render(<Index />, document.getElementById('root'))