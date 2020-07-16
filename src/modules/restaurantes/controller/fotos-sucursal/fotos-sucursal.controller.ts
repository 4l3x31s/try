import { Controller, Post, Body, Get, Param, Delete } from '@nestjs/common';
import { FotosSucursalProvider } from '../../provider/fotos-sucursal.provider';
import { FotoSucursal } from '../../../../model/FotoSucursal';

@Controller('fotos-sucursal')
export class FotosSucursalController {
    constructor(private readonly fotoSucursalProvider: FotosSucursalProvider) {}

    @Post()
    create(@Body() fotoSucursalDto: FotoSucursal): Promise<FotoSucursal> {
      return this.fotoSucursalProvider.create(fotoSucursalDto);
    }
  
    @Get()
    findAll(): Promise<FotoSucursal[]> {
      return this.fotoSucursalProvider.findAll();
    }
  
    @Get(':id')
    findOne(@Param('id') id: string): Promise<FotoSucursal> {
      return this.fotoSucursalProvider.findOne(id);
    }
  
    @Delete(':id')
    remove(@Param('id') id: string): Promise<void> {
      return this.fotoSucursalProvider.remove(id);
    }
}
