import { diskStorage } from 'multer';
import { Controller, Param, Delete, Get, Post, Body, UseInterceptors, UploadedFile, Res } from '@nestjs/common';
import { MenuProvider } from '../../provider/menu.provider';
import { Menu } from '../../../../model/Menu';
import { FileInterceptor } from '@nestjs/platform-express';
import { editFileName, imageFileFilter } from '../../../../utils/file-upload.utils';

import * as fs from 'fs';

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

    @Get('sucursal/:id')
    findBySucursal(@Param('id') id: string): Promise<Menu[]> {
      return this.menuProvider.findBySucursal(id);
    }
    @Get('sucursal/image/:id')
    findBySucursalImage(@Param('id') id: string): Promise<Menu[]> {
      return this.menuProvider.findBySucursal(id);
    }
  
    @Get(':id')
    findOne(@Param('id') id: string): Promise<Menu> {
      return this.menuProvider.findOne(id);
    }
  
    @Delete(':id')
    remove(@Param('id') id: string): Promise<void> {
      return this.menuProvider.remove(id);
    }

    @Post('subida/:id')
    @UseInterceptors(
      FileInterceptor('image', {
        storage: diskStorage({
          destination: __dirname + '../../../../../../files/menu',
          filename: editFileName,
        }),
        fileFilter: imageFileFilter,
      }),
    )
    async uploadFile(@UploadedFile() file, @Param('id') idMenu: string): Promise<Menu> {
      console.log(file);
      const response = {
        originalname: file.originalname,
        filename: file.filename,
      };
      //TODO: tipo 1= sucursal, 2= menu, 3= avatar
      let menu: Menu = await this.menuProvider.findOne(idMenu);
      if(menu.imagen){
        fs.unlink(__dirname + '../../../../../../../menu' + menu.imagen, err => {
          console.log(err);
        });
      }
      menu.imagen = file.filename

      return this.menuProvider.create(menu);
    }

    @Get('archivos/:idMenu')
    async seeUploadedFile(@Param('idMenu') idMenu: string, @Res() res) {
      let menu: Menu = await this.menuProvider.findOne(idMenu);
      let dir = __dirname + '../../../../../../files/menu';
      return res.sendFile(menu.imagen , { root: dir });
    }
}
