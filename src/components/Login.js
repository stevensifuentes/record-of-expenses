import React from 'react'
import Helmet from 'react-helmet'
import styled from 'styled-components'

import { Boton } from '../elements/Boton'
import { ReactComponent as SvgLogin } from '../img/login.svg'
import { ContenedorHeader, Header, Titulo } from '../elements/Header'
import { ContenedorBoton, Formulario, Input } from '../elements/ElementosFormulario'

const Svg = styled(SvgLogin)`
  width: 100%;
  max-height: 12.5rem; /* 200px */
  margin-bottom: 1.25rem; /* 20px */
`

const Login = () => {
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
      
      <Formulario>
        <Svg />
        <Input 
          type='email'
          name='email'
          autoComplete='off'
          placeholder='Correo Electrónico' />
        <Input
          type='password'
          name='password'
          placeholder='Contraseña' />
        <ContenedorBoton>
          <Boton as='button' primario>Iniciar Sesión</Boton>
        </ContenedorBoton>
      </Formulario>
    </>
  )
}

export default Login