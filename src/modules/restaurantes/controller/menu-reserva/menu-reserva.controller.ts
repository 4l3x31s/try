import { Controller, Post, Body, Get, Param, Delete } from '@nestjs/common';
import { MenuReservaProvider } from '../../provider/menu-reserva.provider';
import { MenuReserva } from '../../../../model/MenuReserva';

@Controller('menu-reserva')
export class MenuReservaController {
    constructor(private readonly menuReservaProvider: MenuReservaProvider) {}

    @Post()
    create(@Body() menuReserva: MenuReserva): Promise<MenuReserva> {
      return this.menuReservaProvider.create(menuReserva);
    }
  
    @Get()
    findAll(): Promise<MenuReserva[]> {
      return this.menuReservaProvider.findAll();
    }
  
    @Get(':id')
    findOne(@Param('id') id: string): Promise<MenuReserva> {
      return this.menuReservaProvider.findOne(id);
    }
  
    @Delete(':id')
    remove(@Param('id') id: string): Promise<void> {
      return this.menuReservaProvider.remove(id);
    }

    @Get('reserva/:id')
    findByReserva(@Param('id') id: string): Promise<MenuReserva[]> {
      console.log(id);
      return this.menuReservaProvider.findByReserva(id);
    }
}
