import React from 'react'
import Helmet from 'react-helmet'
import styled from 'styled-components'

import { Boton } from '../elements/Boton'
import { ReactComponent as SvgRegistro } from '../img/registro.svg'
import { ContenedorHeader, Header, Titulo } from '../elements/Header'
import { ContenedorBoton, Formulario, Input } from '../elements/ElementosFormulario'

const Svg = styled(SvgRegistro)`
  width: 100%;
  max-height: 6.25rem; /* 100px */
  margin-bottom: 1.25rem; /* 20px */
`

const Signup = () => {
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
        <Input 
          type='password'
          name='password2'
          placeholder='Repetir la contraseña' />
        <ContenedorBoton>
          <Boton as='button' primario>Crear Cuenta</Boton>
        </ContenedorBoton>
      </Formulario>
    </>
  )
}

export default Signup