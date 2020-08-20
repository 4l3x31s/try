import { Controller, Post, Body, Get, Param, Delete } from '@nestjs/common';
import { EmpresaRrssProvider } from '../../provider/empresa-rrss.provider';
import { EmpresaRrss } from '../../../../model/EmpresaRrss';

@Controller('empresa-rss')
export class EmpresaRssController {
    constructor(private readonly empresaRrssProvider: EmpresaRrssProvider) {}

    @Post()
    create(@Body() empresaRss: EmpresaRrss): Promise<EmpresaRrss> {
      return this.empresaRrssProvider.create(empresaRss);
    }
  
    @Get()
    findAll(): Promise<EmpresaRrss[]> {
      return this.empresaRrssProvider.findAll();
    }
  
    @Get(':id')
    findOne(@Param('id') id: string): Promise<EmpresaRrss> {
      return this.empresaRrssProvider.findOne(id);
    }
  
    @Delete(':id')
    remove(@Param('id') id: string): Promise<void> {
      return this.empresaRrssProvider.remove(id);
    }
}
