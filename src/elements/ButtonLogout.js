import { signOut } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

import { auth } from '../firebase/firebaseConfig'
import { Boton } from './Boton'
import { ReactComponent as IconLogout } from './../img/log-out.svg'

const ButtonLogout = () => {
    const navigate = useNavigate()

    const logout = async () => {
        try {
            await signOut(auth)
            navigate('/login')
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Boton iconoGrande as='button' onClick={ logout }>
            <IconLogout />
        </Boton>
    )
}

export default ButtonLogout