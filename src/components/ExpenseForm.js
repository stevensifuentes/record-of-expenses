import React, { useState } from 'react'
import { Boton } from '../elements/Boton'

import {
    ContenedorBoton,
    ContenedorFiltros,
    Formulario,
    Input,
    InputGrande
} from '../elements/ElementosFormulario'

import { ReactComponent as IconPlus } from './../img/plus.svg'
import SelectCategories from './SelectCategories'

const ExpenseForm = () => {
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')

    const handleChange = ({ target:{name, value} }) => {
        name==='price' ? setPrice(value.replace(/[^0-9.]/g, '')) : setDescription(value)
    }
    
    return (
        <Formulario>
            <ContenedorFiltros>
                <SelectCategories />
                <p>Date Spiker</p>
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
        </Formulario>
    )
}

export default ExpenseForm