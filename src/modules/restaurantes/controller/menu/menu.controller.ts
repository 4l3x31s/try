import { Controller, Param, Delete, Get, Post, Body } from '@nestjs/common';
import { MenuProvider } from '../../provider/menu.provider';
import { Menu } from '../../../../model/Menu';

@Controller('menu')
export class MenuController {
    constructor(private readonly menuProvider: MenuProvider) {}

    @Post()
    create(@Body() menuDto: Menu): Promise<Menu> {
      return this.menuProvider.create(menuDto);
    }
  
    @Get()
    findAll(): Promise<Menu[]> {
      return this.menuProvider.findAll();
    }
  
    @Get(':id')
    findOne(@Param('id') id: string): Promise<Menu> {
      return this.menuProvider.findOne(id);
    }
  
    @Delete(':id')
    remove(@Param('id') id: string): Promise<void> {
      return this.menuProvider.remove(id);
    }
}
