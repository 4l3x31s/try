import { Controller, Post, Body, Get, Param, Delete } from '@nestjs/common';
import { SucursalProvider } from '../../provider/sucursal.provider';
import { Sucursal } from '../../../../model/Sucursal';

@Controller('sucursal')
export class SucursalController {
    constructor(private readonly sucursalProvider: SucursalProvider) {}

    @Post()
    create(@Body() sucursalDto: Sucursal): Promise<Sucursal> {
      return this.sucursalProvider.create(sucursalDto);
    }
  
    @Get()
    findAll(): Promise<Sucursal[]> {
      return this.sucursalProvider.findAll();
    }
  
    @Get(':id')
    findOne(@Param('id') id: string): Promise<Sucursal> {
      return this.sucursalProvider.findOne(id);
    }
  
    @Delete(':id')
    remove(@Param('id') id: string): Promise<void> {
      return this.sucursalProvider.remove(id);
    }

    @Get('ciudad/:id')
    findSucursalesPorCiudad(@Param('id') idCiudad: number): Promise<Sucursal[]> {
      return this.sucursalProvider.findSucursalCiudad(idCiudad);
    }
    
}
