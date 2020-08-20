import { Controller, Post, Body, Get, Param, Delete } from '@nestjs/common';
import { UsuarioProvider } from '../../provider/usuario.provider';
import { Usuario } from '../../../../model/Usuario';

@Controller('usuario')
export class UsuarioController {
    constructor(private readonly usuarioProvider: UsuarioProvider) {}

    @Post()
    create(@Body() usuarioDto: Usuario): Promise<Usuario> {
      try {
        usuarioDto.estado = true;
        usuarioDto.fechaRegistro = new Date();
        usuarioDto.valor = 1;
      return this.usuarioProvider.create(usuarioDto);
      } catch (error) {
        console.log(error);
        return error;
      }
    }
  
    @Get()
    findAll(): Promise<Usuario[]> {
      return this.usuarioProvider.findAll();
    }
  
    @Get(':id')
    findOne(@Param('id') id: string): Promise<Usuario> {
      return this.usuarioProvider.findOne(id);
    }
  
    @Delete(':id')
    remove(@Param('id') id: string): Promise<void> {
      return this.usuarioProvider.remove(id);
    }

    @Get('buscar/correo/:correo')
    findCorreo(@Param('correo') correo: string): Promise<Usuario> {
      return this.usuarioProvider.findCorreo(correo);
    }
    @Get('buscar/celular/:celular')
    findCelular(@Param('celular') celular: string): Promise<Usuario> {
      return this.usuarioProvider.findCelular(celular);
    }

    
}
