import { Empresa } from '../../model/Empresa';
import { Sucursal } from '../../model/Sucursal';
import { Usuario } from '../../model/Usuario';
export interface RegEmpresa{
    empresa: Empresa;
    sucursal: Sucursal;
    usuario: Usuario;
    mensaje?: string;
    estado?: boolean;
}