import { Controller, Post, Get, Delete, Param, Body } from '@nestjs/common';
import { PaisProvider } from '../../provider/pais.provider';
import { Pais } from '../../../../model/Pais';

@Controller('pais')
export class PaisController {
    constructor(private readonly paisProvider: PaisProvider) {}

    @Post()
    create(@Body() paisDto: Pais): Promise<Pais> {
      return this.paisProvider.create(paisDto);
    }
  
    @Get()
    findAll(): Promise<Pais[]> {
      return this.paisProvider.findAll();
    }
  
    @Get(':id')
    findOne(@Param('id') id: string): Promise<Pais> {
      return this.paisProvider.findOne(id);
    }
  
    @Delete(':id')
    remove(@Param('id') id: string): Promise<void> {
      return this.paisProvider.remove(id);
    }
}
