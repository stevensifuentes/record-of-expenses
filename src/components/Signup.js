import React, { useState } from 'react'
import Helmet from 'react-helmet'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { auth } from './../firebase/firebaseConfig'
import { createUserWithEmailAndPassword } from 'firebase/auth'

import { Alerta } from '../elements/Alerta'
import { Boton } from '../elements/Boton'
import { ContenedorHeader, Header, Titulo } from '../elements/Header'
import { ContenedorBoton, Formulario, Input } from '../elements/ElementosFormulario'
import { ReactComponent as SvgRegistro } from '../img/registro.svg'

const Svg = styled(SvgRegistro)`
  width: 100%;
  max-height: 6.25rem; /* 100px */
  margin-bottom: 1.25rem; /* 20px */
`

const Signup = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordTwo, setPasswordTwo] = useState('')
  const [alerta, setAlerta] = useState({})
  const [estadoAlerta, setEstadoAlerta] = useState(false)

  const onChange = ({ target: { name, value } }) => {
    switch (name) {
      case 'email':
        setEmail(value)
        break;
      case 'password':
        setPassword(value)
        break
      case 'passwordTwo':
        setPasswordTwo(value)
        break
      default:
        break;
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setEstadoAlerta(false)
    setAlerta({})

    if(email.length===0 || password.length===0 || passwordTwo.length===0){
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

    if(password!==passwordTwo){
      setEstadoAlerta(true)
      setAlerta({
        tipo: 'error',
        mensaje: 'Las contraseñas no coinciden'
      })
      return
    }
  
    try {
      await createUserWithEmailAndPassword(auth, email, password)
      setEstadoAlerta(true)
      setAlerta({
        tipo: 'exito',
        mensaje: 'Usuario creado correctamente'
      })
      setTimeout(() => {
        navigate('/')
      }, 4000);
    } catch (error) {
      let mensaje;
      switch (error.code) {
        case 'auth/weak-password':
          mensaje = 'La contraseña tiene que ser de al menos 6 caracteres'
          break;
        case 'auth/email-already-in-use':
          mensaje = 'Ya existe una cuenta con el correo electrónico proporcionado'
          break;
        case 'auth/invalid-email':
          mensaje = 'El correo electrónico no es válido'
          break
        default:
          mensaje = 'Hubo un error al crear la cuenta'
          break
      }
      setEstadoAlerta(true)
      setAlerta({ tipo: 'error', mensaje })
    }
  }

  return (
    <>
      <Helmet>
        <title>Crear Cuenta</title>
      </Helmet>

      <Header>
        <ContenedorHeader>
          <Titulo>Crear Cuenta</Titulo>
          <div>
            <Boton to='/login'>Iniciar Sesión</Boton>
          </div>
        </ContenedorHeader>
      </Header>

      <Formulario onSubmit={handleSubmit}>
        <Svg />
        <Input
          type='text' 
          name='email'
          autoComplete='off'
          value={email}
          onChange={onChange}
          placeholder='Correo Electrónico' />
        <Input
          type='password'
          name='password'
          value={password}
          onChange={onChange}
          placeholder='Contraseña' />
        <Input
          type='password'
          name='passwordTwo'
          value={passwordTwo}
          onChange={onChange}
          placeholder='Repetir la contraseña' />
        <ContenedorBoton>
          <Boton as='button' primario>Crear Cuenta</Boton>
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

export default Signup