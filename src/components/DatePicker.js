import React from 'react'
import styled from 'styled-components'
import { es } from 'date-fns/locale'
import dateFnsParse from 'date-fns/parse'
import dateFnsFormat from 'date-fns/format'
import { DateUtils } from 'react-day-picker'
import DayPickerInput from 'react-day-picker/DayPickerInput'

import theme from './../theme'
import 'react-day-picker/lib/style.css'

const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
const dias_semana_cortos = ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa']

function parseDate(str, format) {
    const parsed = dateFnsParse(str, format, new Date(), { locale: es });
    if (DateUtils.isDate(parsed)) {
        return parsed;
    }
    return undefined;
}

function formatDate(date, format) {
    return dateFnsFormat(date, format, { locale: es });
}

const DatePicker = ({ date, setDate }) => {
    return (
        <ContenedorInput>
            <DayPickerInput 
                formatDate={formatDate}
                format={`dd 'de' MMMM 'de' yyyy`}
                parseDate={parseDate}
                value={date}
                onDayChange={(day) => setDate(day)}
                dayPickerProps={{
                    month: meses,
                    weekdaysShort: dias_semana_cortos
                }}
            />
        </ContenedorInput>
    )
}

const ContenedorInput = styled.div`
    input {
        font-family: 'Work Sans', sans-serif;       
        box-sizing: border-box;
        background: ${theme.grisClaro};
        border: none;
        cursor: pointer;
        border-radius: 0.625rem; /* 10px */
        height: 5rem; /* 80px */
        width: 100%;
        padding: 0 1.25rem; /* 20px */
        font-size: 1.5rem; /* 24px */
        text-align: center;
        display: flex;
        align-items: center;
        outline: none;
        justify-content: center;
    }
 
    @media(max-width: 60rem){ /* 950px */
        & > * {
            width: 100%;
        }
    }
`;

export default DatePicker