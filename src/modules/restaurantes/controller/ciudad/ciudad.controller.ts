import { ResponseCiudades } from './../../../../dto/response/ResponseCiudadesPais';
import { Ciudad } from './../../../../model/Ciudad';
import { Controller, Post, Body, Get, Param, Delete } from '@nestjs/common';
import { CiudadProvider } from '../../provider/ciudad.provider';


@Controller('ciudad')
export class CiudadController {
    constructor(private readonly ciudadProvider: CiudadProvider) {}

    @Post()
    create(@Body() ciudadDto: Ciudad): Promise<Ciudad> {
      return this.ciudadProvider.create(ciudadDto);
    }
  
    @Get()
    findAll(): Promise<Ciudad[]> {
      return this.ciudadProvider.findAll();
    }
  
    @Get('buscar/:id')
    findOne(@Param('id') id: string): Promise<Ciudad> {
      return this.ciudadProvider.findOne(id);
    }
  
    @Delete('eliminar/:id')
    remove(@Param('id') id: string): Promise<void> {
      return this.ciudadProvider.remove(id);
    }

    @Get('prueba/alex')
    findAllCiudades(): Promise<ResponseCiudades[]>{

      return this.ciudadProvider.findAllCiudades();
    }
}
