import { Empresa } from '../../model/Empresa';
import { Sucursal } from '../../model/Sucursal';
export interface RegEmpresa{
    empresa: Empresa;
    sucursal: Sucursal;
    mensaje?: string;
    estado?: boolean;
}