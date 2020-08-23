import { Controller, Post, Body, Get, Delete, Param } from '@nestjs/common';
import { CategoriaProvider } from '../../provider/categoria.provider';
import { Categoria } from '../../../../model/Categoria';


@Controller('categoria')
export class CategoriaController {
    constructor(private readonly categoriaProvider: CategoriaProvider) {}

    @Post()
    create(@Body() categoriaDto: Categoria): Promise<Categoria> {
      return this.categoriaProvider.create(categoriaDto);
    }
  
    @Get()
    findAll(): Promise<Categoria[]> {
      return this.categoriaProvider.findAll();
    }
  
    @Get(':id')
    findOne(@Param('id') id: string): Promise<Categoria> {
      return this.categoriaProvider.findOne(id);
    }
  
    @Delete(':id')
    remove(@Param('id') id: string): Promise<void> {
      return this.categoriaProvider.remove(id);
    }
}
