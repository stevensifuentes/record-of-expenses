import React, { useState } from 'react'
import { getUnixTime } from 'date-fns'

import { Alerta } from '../elements/Alerta'
import { addExpense } from './../firebase/database'
import { useAuth } from './../context/AuthContext'
import DatePicker from './DatePicker'
import SelectCategories from './SelectCategories'
import { Boton } from '../elements/Boton'
import {
    ContenedorBoton,
    ContenedorFiltros,
    Formulario,
    Input,
    InputGrande
} from '../elements/ElementosFormulario'

import { ReactComponent as IconPlus } from './../img/plus.svg'

const ExpenseForm = () => {
    const { user } = useAuth()
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [date, setDate] = useState(new Date())
    const [category, setCategory] = useState('Hogar')
    const [stateAlert, setStateAlert] = useState(false)
    const [alert, setAlert] = useState({})

    const handleChange = ({ target:{name, value} }) => {
        name==='price' ? setPrice(value.replace(/[^0-9.]/g, '')) : setDescription(value)
    }
    
    const handleSubmit = (e) => {
        e.preventDefault()
        const quantity = parseFloat(price).toFixed(2)
        if(description!=='' && price!==''){
            if(quantity){
                addExpense({
                    category,
                    description,
                    price: Number(quantity),
                    date: getUnixTime(date),
                    uidUser: user.uid
                })
                .then(() => {
                    setDescription('')
                    setPrice('')
                    setCategory('Hogar')
                    setDate(new Date())
                    setStateAlert(true)
                    setAlert({ tipo: 'exito', mensaje: '¡El gasto fue agregado correctamente!' })
                })
                .catch((error) => {
                    setStateAlert(true)
                    setAlert({ tipo: 'error', mensaje: 'Hubo un problema al agregar el gasto' })
                })
            }else {
                setStateAlert(true)
                setAlert({ tipo: 'error', mensaje: 'El valor ingresado no es correcto.' })
            }
        }else{
            setStateAlert(true)
            setAlert({ tipo: 'error', mensaje: 'Rellene todos los campos, por favor.' })
        }
    }
    
    return (
        <Formulario onSubmit={handleSubmit}>
            <ContenedorFiltros>
                <SelectCategories category={category} setCategory={setCategory}/>
                <DatePicker date={date} setDate={setDate}/>
            </ContenedorFiltros>
            <Input
                type='text'
                name='description'
                placeholder='Description'
                autoComplete='off'
                value={description}
                onChange={handleChange}
            />
            <InputGrande
                type='text'
                name='price'
                placeholder='S/0.00'
                autComplete='off'
                value={price}
                onChange={handleChange}
            />
            <ContenedorBoton>
                <Boton as='button' primario conIcono type='submit'>
                    Agregar gasto <IconPlus />
                </Boton>
            </ContenedorBoton>
            <Alerta 
                tipo={alert.tipo}
                mensaje={alert.mensaje}
                estadoAlerta={stateAlert}
                setEstadoAlerta={setStateAlert}
            />
        </Formulario>
    )
}

export default ExpenseForm