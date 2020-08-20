import { FotoSucursal } from './../../../../model/FotoSucursal';
import { Controller, Post, Body, Get, Param, Delete, UseInterceptors, UploadedFile, Res } from '@nestjs/common';
import { FotosSucursalProvider } from '../../provider/fotos-sucursal.provider';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFileName, imageFileFilter } from '../../../../utils/file-upload.utils';

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
  
    @Delete(':id')
    remove(@Param('id') id: string): Promise<void> {
      return this.fotoSucursalProvider.remove(id);
    }

    @Post('subida/:id/:tipo')
    @UseInterceptors(
      FileInterceptor('image', {
        storage: diskStorage({
          destination: './files',
          filename: editFileName,
        }),
        fileFilter: imageFileFilter,
      }),
    )
    uploadFile(@UploadedFile() file, @Param('id') id: string, @Param('tipo') tipo: number): Promise<FotoSucursal> {
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
      return this.fotoSucursalProvider.create(fotoSucursal);
    }
    @Get('archivos/:imgpath')
    seeUploadedFile(@Param('imgpath') image, @Res() res) {
      return res.sendFile(image, { root: './files' });
    }
}
