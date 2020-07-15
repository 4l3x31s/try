import { Controller, Post, Body } from '@nestjs/common';
import { UsuarioProvider } from '../../provider/usuario.provider';
import { Login } from '../../../../../dist/dto/request/login';
import { ResponseLogin } from '../../../../dto/response/ResponseLogin';
import { Usuario } from '../../../../model/Usuario';

@Controller('auth')
export class LoginController {
    constructor(private readonly usuarioProvider: UsuarioProvider) {}
    @Post('login')
    async create(@Body() loginDto: Login): Promise<ResponseLogin> {
        let respuesta: ResponseLogin = <ResponseLogin>{};
        try{
            let user: Usuario = await this.usuarioProvider.login(loginDto.correo, loginDto.pass);
            if(user){
                respuesta.usuario = user;
                respuesta.estado = true;
                respuesta.mensaje = null;
            }else{
                respuesta.estado = false;
                respuesta.mensaje = 'El usuario y/o contraseña son incorrectos.';
            }
            
        }catch(err) {
            respuesta.estado = false;
            respuesta.mensaje = 'Hubo un problema al establecer la conexión con la base de datos.';
        }finally{
            return respuesta;
        }
        
    }
}
