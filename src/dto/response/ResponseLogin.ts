import { Usuario } from '../../model/Usuario';
import { Sucursal } from '../../model/Sucursal';
export interface ResponseLogin {
    usuario: Usuario;
    sucursal: Sucursal[];
    estado: boolean;
    mensaje: string;
}