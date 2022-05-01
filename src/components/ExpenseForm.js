import React, { useState, useEffect } from 'react'
import { getUnixTime, fromUnixTime } from 'date-fns'
import { useNavigate } from 'react-router-dom'

import { addExpense, updateExpense } from './../firebase/database'
import DatePicker from './DatePicker'
import SelectCategories from './SelectCategories'
import { Alerta } from '../elements/Alerta'
import { Boton } from '../elements/Boton'
import {
    ContenedorBoton,
    ContenedorFiltros,
    Formulario,
    Input,
    InputGrande
} from '../elements/ElementosFormulario'

import { ReactComponent as IconPlus } from './../img/plus.svg'
import { useAuth } from '../hooks/useAuth'

const ExpenseForm = ({ expense }) => {
    const { user } = useAuth()
    const navigate = useNavigate()
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [date, setDate] = useState(new Date())
    const [category, setCategory] = useState('hogar')
    const [stateAlert, setStateAlert] = useState(false)
    const [alert, setAlert] = useState({})

    useEffect(() => {
        if(expense){
            const { description, price, date, category, uidUser } = expense.data()
            if(uidUser===user.uid){
                setDescription(description)
                setPrice(price)
                setDate(fromUnixTime(date))
                setCategory(category)
            }else{
                navigate('/list')
            }
        }
    }, [expense, navigate, user])


    const handleChange = ({ target: { name, value } }) => {
        name === 'price' ? setPrice(value.replace(/[^0-9.]/g, '')) : setDescription(value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const quantity = parseFloat(price).toFixed(2)
        if (description!=='' && price!=='') {
            const option = expense ? 'editar' : 'agregar'
            if (quantity) {
                switch (option) {
                    case 'agregar':
                        try {
                            await addExpense({
                                category,
                                description,
                                price: quantity,
                                date: getUnixTime(date),
                                uidUser: user.uid
                            })
                            setDescription('')
                            setPrice('')
                            setCategory('hogar')
                            setDate(new Date())
                            setStateAlert(true)
                            setAlert({ tipo: 'exito', mensaje: '¡El gasto fue agregado correctamente!' })
                        } catch (error) {
                            setStateAlert(true)
                            setAlert({ tipo: 'error', mensaje: 'Hubo un problema al agregar el gasto' })
                        }
                        break
                    case 'editar':
                        await updateExpense({ 
                            id: expense.id, 
                            category, 
                            description, 
                            price: quantity, 
                            date: getUnixTime(date)
                        })
                        navigate('/list')
                        break
                    default:
                        break
                }
            } else {
                setStateAlert(true)
                setAlert({ tipo: 'error', mensaje: 'El valor ingresado no es correcto.' })
            }
        } else {
            setStateAlert(true)
            setAlert({ tipo: 'error', mensaje: 'Rellene todos los campos, por favor.' })
        }
    }

    return (
        <Formulario onSubmit={handleSubmit}>
            <ContenedorFiltros>
                <SelectCategories category={category} setCategory={setCategory} />
                <DatePicker date={date} setDate={setDate} />
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
                    {expense ? 'Editar': 'Agregar'} gasto <IconPlus />
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