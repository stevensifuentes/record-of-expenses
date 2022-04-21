import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from './../context/AuthContext'

const PrivateRoute = ({ children }) => {
    const { user } = useAuth()

    return user ? children : <Navigate replace to='/login'/>

}

export default PrivateRoute