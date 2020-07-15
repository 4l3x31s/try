import { Controller, Post, Body, Get, Param, Delete } from '@nestjs/common';
import { HorarioProvider } from '../../provider/horario.provider';
import { Horario } from '../../../../model/Horario';

@Controller('horario')
export class HorarioController {
    constructor(private readonly horarioProvider: HorarioProvider) {}

    @Post()
    create(@Body() horarioDto: Horario): Promise<Horario> {
      return this.horarioProvider.create(horarioDto);
    }
  
    @Get()
    findAll(): Promise<Horario[]> {
      return this.horarioProvider.findAll();
    }
  
    @Get(':id')
    findOne(@Param('id') id: string): Promise<Horario> {
      return this.horarioProvider.findOne(id);
    }
  
    @Delete(':id')
    remove(@Param('id') id: string): Promise<void> {
      return this.horarioProvider.remove(id);
    }
}
