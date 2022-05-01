import { Helmet } from 'react-helmet'
import ButtonLogout from './elements/ButtonLogout'
import { Boton } from './elements/Boton'
import { 
  Header,
  ContenedorHeader,
  ContenedorBotones,
  Titulo } from './elements/Header'
import ExpenseForm from './components/ExpenseForm'
import TotalBar from './components/TotalBar'
import { useAuth } from './hooks/useAuth'

const App = () => {
  const contexto = useAuth()
  console.log('From App', contexto)
  
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
            <ButtonLogout />
          </ContenedorBotones>
        </ContenedorHeader>
      </Header>

      <ExpenseForm />

      <TotalBar />
    </>
  )
}

export default App