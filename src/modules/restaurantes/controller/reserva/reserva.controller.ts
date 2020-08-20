import { Controller, Post, Body, Get, Param, Delete } from '@nestjs/common';
import { ReservaProvider } from '../../provider/reserva.provider';
import { Reserva } from '../../../../model/Reserva';

@Controller('reserva')
export class ReservaController {
    constructor(private readonly reservaProvider: ReservaProvider) {}

    @Post()
    create(@Body() reservaDto: Reserva): Promise<Reserva> {
      return this.reservaProvider.create(reservaDto);
    }
  
    @Get()
    findAll(): Promise<Reserva[]> {
      return this.reservaProvider.findAll();
    }
  
    @Get(':id')
    findOne(@Param('id') id: string): Promise<Reserva> {
      return this.reservaProvider.findOne(id);
    }
  
    @Delete(':id')
    remove(@Param('id') id: string): Promise<void> {
      return this.reservaProvider.remove(id);
    }
    //listarReservasDia
    @Get('sucursal/:id')
    findSucursal(@Param('id') id: string): Promise<Reserva[]> {
      return this.reservaProvider.listarReservasDia(id);
    }
}
