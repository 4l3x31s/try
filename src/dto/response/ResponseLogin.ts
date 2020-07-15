import { Usuario } from '../../model/Usuario';
export interface ResponseLogin {
    usuario: Usuario;
    estado: boolean;
    mensaje: string;
}