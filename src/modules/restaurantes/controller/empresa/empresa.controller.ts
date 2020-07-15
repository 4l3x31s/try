import { Controller, Post, Body, Get, Param, Delete } from '@nestjs/common';
import { Empresa } from '../../../../model/Empresa';
import { EmpresaProvider } from '../../provider/empresa.provider';
import { RegEmpresa } from '../../../../../dist/dto/RegEmpresa';

@Controller('empresa')
export class EmpresaController {
    constructor(private readonly empresaProvider: EmpresaProvider) {}

    @Post()
    create(@Body() empresaDto: Empresa): Promise<Empresa> {
      return this.empresaProvider.create(empresaDto);
    }
    @Post('first')
    createFirst(@Body() empresaDto: RegEmpresa): Promise<RegEmpresa> {
        console.log(empresaDto);
      return this.empresaProvider.regEmpresa(empresaDto.empresa, empresaDto.sucursal);
    }
  
    @Get()
    findAll(): Promise<Empresa[]> {
      return this.empresaProvider.findAll();
    }
  
    @Get(':id')
    findOne(@Param('id') id: string): Promise<Empresa> {
      return this.empresaProvider.findOne(id);
    }
  
    @Delete(':id')
    remove(@Param('id') id: string): Promise<void> {
      return this.empresaProvider.remove(id);
    }
}
