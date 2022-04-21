import { createContext, useContext, useEffect, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../firebase/firebaseConfig'

export const AuthContext = createContext()

export const useAuth = () => {
    return useContext(AuthContext)
}

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState()

    /* Creamos un state para saber cuando termina de 
    cargar la comprobación de onAuthStateChanged */
    const [loading, setLoading] = useState(true)

    // Efecto para ejecutar la comprobación una sola vez.
    useEffect(() => {
        // Comprobamos si hay un usuario
        const cancelarSuscripcion = onAuthStateChanged(auth, (userAuth) => {
            setUser(userAuth)
            setLoading(false)
        })

        return cancelarSuscripcion
    }, [])

    return ( 
        <AuthContext.Provider value={{ user }}>
            {!loading && children }
        </AuthContext.Provider> 
    )
} 