import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import WebFont from 'webfontloader'

import App from './App'
import EditExpense from './components/EditExpense'
import ExpensesCategory from './components/ExpensesCategory'
import ExpenseList from './components/ExpenseList'
import PrivateRoute from './components/PrivateRoute'
import Login from './components/Login'
import Signup from './components/Signup'

import Contenedor from './elements/Contenedor'
import Fondo from './elements/Fondo'
import favicon from './img/logo.png'
import './index.css'

import { AuthProvider } from './context/AuthContext'
import { TotalSpentMonthProvider } from './context/TotalSpentMonthContext'

WebFont.load({
  google: { 
    families: ['Work Sans:400,500,700', 'sans-serif'] // Work+Sans:wght@400;500;700
  }
})

const Index = () => {
  return (
    <>
      <Helmet>
        <link rel="shortcut icon" href={favicon} type="image/x-icon" />
      </Helmet>

      <AuthProvider>
        <TotalSpentMonthProvider>
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
        </TotalSpentMonthProvider>
      </AuthProvider>

      <Fondo />
    </>
  )
}

ReactDOM.render(<Index />, document.getElementById('root'))