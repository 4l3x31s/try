import { ResponseGlobal } from './../../../../dto/response/ResponseGlobal';
import { Controller, Post, Body, Get, Param, Delete } from '@nestjs/common';
import { ReservaProvider } from '../../provider/reserva.provider';
import { Reserva } from '../../../../model/Reserva';
import { RegReserva } from '../../../../dto/request/RegReserva';

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

    @Post('registro')
    registrarMenuReserva(@Body() reservaDto: RegReserva): Promise<ResponseGlobal> {
      return this.reservaProvider.registraReserva(reservaDto.reserva, reservaDto.lstMenuReserva );
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
    //listarReservasFecha
    @Get('sucursal/fecha/:id/:fechaIn/:fechaFi')
    listarSucursalesFecha(@Param('id') id: string,@Param('fechaIn') fechaIn: string, @Param('fechaFi') fechaFi: string): Promise<Reserva[]> {
      return this.reservaProvider.listarReservasFecha(id, fechaIn, fechaFi);
    }
}
