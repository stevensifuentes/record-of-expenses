
import {ReactComponent as IconoComida} from './../img/cat_comida.svg'
import {ReactComponent as IconoCompras} from './../img/cat_compras.svg'
import {ReactComponent as IconoCuentasYPagos} from './../img/cat_cuentas-y-pagos.svg'
import {ReactComponent as IconoDiversion} from './../img/cat_diversion.svg'
import {ReactComponent as IconoHogar} from './../img/cat_hogar.svg'
import {ReactComponent as IconoRopa} from './../img/cat_ropa.svg'
import {ReactComponent as IconoSaludEHigiene} from './../img/cat_salud-e-higiene.svg'
import {ReactComponent as IconoTransporte} from './../img/cat_transporte.svg'

const Icons = {
    'comida': <IconoComida />,
    'cuentas y pagos': <IconoCuentasYPagos />,
    'hogar': <IconoHogar />,
    'transporte': <IconoTransporte />,
    'ropa': <IconoRopa />,
    'salud e higiene': <IconoSaludEHigiene />,
    'compras': <IconoCompras />,
    'diversion': <IconoDiversion />
}

export const IconCategory = ({ id }) => {
    return( Icons[id] )
}