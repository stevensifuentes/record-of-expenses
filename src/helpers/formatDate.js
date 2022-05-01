import { format, fromUnixTime } from 'date-fns'
import { es } from 'date-fns/locale'

export const formatDate = (date) => {
    return format(fromUnixTime(date), `dd 'de' MMMM 'de' yyyy`, { locale: es })
}