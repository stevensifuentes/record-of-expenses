import { Helmet } from 'react-helmet'
import { Boton } from './elements/Boton'
import { 
  Header,
  ContenedorHeader,
  ContenedorBotones,
  Titulo } from './elements/Header'

const App = () => {
  return (
    <>
      <Helmet>
        <title>Agregar Gasto</title>
      </Helmet>

      <Header>
        <ContenedorHeader>
          <Titulo>Agregar Gasto</Titulo>
          <ContenedorBotones>
            <Boton to='/categories'>Categorias</Boton>
            <Boton to='/list'>Lista de gastos</Boton>
            <Boton to='/'>X</Boton>
          </ContenedorBotones>
        </ContenedorHeader>
      </Header>
    </>
  )
}

export default App