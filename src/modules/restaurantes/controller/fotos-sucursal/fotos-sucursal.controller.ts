import { FotoSucursal } from './../../../../model/FotoSucursal';
import { Controller, Post, Body, Get, Param, Delete, UseInterceptors, UploadedFile, Res } from '@nestjs/common';
import { FotosSucursalProvider } from '../../provider/fotos-sucursal.provider';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFileName, imageFileFilter } from '../../../../utils/file-upload.utils';

import * as fs from 'fs';
import * as path from 'path';

@Controller('fotos-sucursal')
export class FotosSucursalController {
    constructor(private readonly fotoSucursalProvider: FotosSucursalProvider) {}

    @Post()
    create(@Body() fotoSucursalDto: FotoSucursal): Promise<FotoSucursal> {
      return this.fotoSucursalProvider.create(fotoSucursalDto);
    }
  
    @Get()
    findAll(): Promise<FotoSucursal[]> {
      return this.fotoSucursalProvider.findAll();
    }
  
    @Get(':id')
    findOne(@Param('id') id: string): Promise<FotoSucursal> {
      return this.fotoSucursalProvider.findOne(id);
    }

    @Get('sucursal/:id')
    findBySucursal(@Param('id') id: string): Promise<FotoSucursal[]> {
      return this.fotoSucursalProvider.findBySucursal(id);
    }
  
    @Delete(':id')
    remove(@Param('id') id: string): Promise<void> {
      return this.fotoSucursalProvider.remove(id);
    }

    @Post('subida/:id/:tipo')
    @UseInterceptors(
      FileInterceptor('image', {
        storage: diskStorage({
          destination: __dirname + '../../../../../../files',
          filename: editFileName,
        }),
        fileFilter: imageFileFilter,
      }),
    )
    async uploadFile(@UploadedFile() file, @Param('id') id: string, @Param('tipo') tipo: number): Promise<FotoSucursal> {
      console.log(file);
      const response = {
        originalname: file.originalname,
        filename: file.filename,
      };
      //TODO: tipo 1= sucursal, 2= menu, 3= avatar
      let fotoSucursal:FotoSucursal = <FotoSucursal>{
        idSucursal: id,
        imagen: file.filename,
        tipo: tipo
      };
      let lstFotoSucursal: FotoSucursal[] = await this.fotoSucursalProvider.findBySucursal(id);
      for (const iterator of lstFotoSucursal) {
        fs.unlink(__dirname + '../../../../../../files/' + iterator.imagen, err => {
          console.log(err);
        });
        await this.fotoSucursalProvider.remove(iterator.id);
      }
      return this.fotoSucursalProvider.create(fotoSucursal);
    }

    
    @Get('archivos/:sucursal')
    async seeUploadedFile(@Param('sucursal') sucursal: string, @Res() res) {
      let lstFotoSucursal: FotoSucursal[] = await this.fotoSucursalProvider.findBySucursal(sucursal);
      let dir = __dirname + '../../../../../../files';
      return res.sendFile(lstFotoSucursal[0].imagen , { root: dir });
    }
}
