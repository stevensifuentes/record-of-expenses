import React, { useState } from 'react'
import Helmet from 'react-helmet'
import { signInWithEmailAndPassword } from "firebase/auth"
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'

import { Alerta } from '../elements/Alerta'
import { auth } from './../firebase/firebaseConfig'
import { Boton } from '../elements/Boton'
import { ContenedorHeader, Header, Titulo } from '../elements/Header'
import { ContenedorBoton, Formulario, Input } from '../elements/ElementosFormulario'
import { ReactComponent as SvgLogin } from '../img/login.svg'

const Svg = styled(SvgLogin)`
  width: 100%;
  max-height: 12.5rem; /* 200px */
  margin-bottom: 1.25rem; /* 20px */
`

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [alerta, setAlerta] = useState({})
  const [estadoAlerta, setEstadoAlerta] = useState(false)

  const handleChange = ({ target:{ name, value } }) => {
    name==='email' ? setEmail(value) : setPassword(value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setEstadoAlerta(false)
    setAlerta({})

    if(email.length===0 || password.length===0){
      setEstadoAlerta(true)
      setAlerta({
        tipo: 'error',
        mensaje: 'Complete todos los campos'
      })
      return
    }

    const isEmail = /[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+/
    if(!isEmail.test(email)) {
      setEstadoAlerta(true)
      setAlerta({
        tipo: 'error',
        mensaje: 'No es un email válido'
      })
      return
    }

    try {
      await signInWithEmailAndPassword(auth, email, password)
      navigate('/')
    } catch (error) {
      let mensaje;
      switch (error.code) {
        case 'auth/wrong-password':
          mensaje = 'Contraseña incorrecta'
          break
        case 'auth/user-not-found':
          mensaje = 'Correo no existe'
          break
        default:
          mensaje = 'Logueo incorrecto'
          break
      }
      setEstadoAlerta(true)
      setAlerta({ tipo: 'error', mensaje })
    }
  }

  return (
    <>
      <Helmet>
        <title>Iniciar Sesión</title>
      </Helmet>

      <Header>
        <ContenedorHeader>
          <Titulo>Iniciar Sesión</Titulo>
          <div>
            <Boton to='/signup'>Crear Cuenta</Boton>
          </div>
        </ContenedorHeader>
      </Header>
      
      <Formulario onSubmit={handleSubmit}>
        <Svg />
        <Input 
          type='email'
          name='email'
          value={ email }
          onChange={ handleChange }
          autoComplete='off'
          placeholder='Correo Electrónico' />
        <Input
          type='password'
          name='password'
          value={ password }
          onChange={ handleChange }
          autoComplete='off'
          placeholder='Contraseña' />
        <ContenedorBoton>
          <Boton as='button' primario>Iniciar Sesión</Boton>
        </ContenedorBoton>
      </Formulario>

      <Alerta 
        tipo={alerta.tipo}
        mensaje={alerta.mensaje}
        estadoAlerta={estadoAlerta}
        setEstadoAlerta={setEstadoAlerta}
      />
    </>
  )
}

export default Login