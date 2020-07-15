import { Controller, Post, Body, Get, Param, Delete } from '@nestjs/common';
import { UsuarioProvider } from '../../provider/usuario.provider';
import { Usuario } from '../../../../model/Usuario';

@Controller('usuario')
export class UsuarioController {
    constructor(private readonly usuarioProvider: UsuarioProvider) {}

    @Post()
    create(@Body() usuarioDto: Usuario): Promise<Usuario> {
      return this.usuarioProvider.create(usuarioDto);
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

    
}
