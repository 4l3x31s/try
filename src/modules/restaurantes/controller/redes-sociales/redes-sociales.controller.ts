import { Controller, Post, Body, Get, Param, Delete } from '@nestjs/common';
import { RedesSocialesProvider } from '../../provider/redes-sociales.provider';
import { RedesSociales } from '../../../../model/RedesSociales';


@Controller('redes-sociales')
export class RedesSocialesController {

    constructor(private readonly rrssProvider: RedesSocialesProvider) {}

    @Post()
    create(@Body() rrss: RedesSociales): Promise<RedesSociales> {
      return this.rrssProvider.create(rrss);
    }
  
    @Get()
    findAll(): Promise<RedesSociales[]> {
      return this.rrssProvider.findAll();
    }
  
    @Get(':id')
    findOne(@Param('id') id: string): Promise<RedesSociales> {
      return this.rrssProvider.findOne(id);
    }
  
    @Delete(':id')
    remove(@Param('id') id: string): Promise<void> {
      return this.rrssProvider.remove(id);
    }
}
