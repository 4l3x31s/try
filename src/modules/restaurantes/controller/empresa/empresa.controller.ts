import { Controller, Post, Body, Get, Param, Delete, UseInterceptors, UploadedFiles, UploadedFile, Res } from '@nestjs/common';
import { Empresa } from '../../../../model/Empresa';
import { EmpresaProvider } from '../../provider/empresa.provider';
import { FilesInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { RegEmpresa } from '../../../../dto/request/RegEmpresa';
import { editFileName, imageFileFilter } from '../../../../utils/file-upload.utils';
import { diskStorage } from 'multer';

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

    @Post('upload/:id/:tipo')
    @UseInterceptors(
      FileInterceptor('image', {
        storage: diskStorage({
          destination: './upload',
          filename: editFileName,
        }),
        fileFilter: imageFileFilter,
      }),
    )
    uploadFile(@UploadedFile() file, @Param('id') id: string, @Param('tipo') tipo: string) {
      console.log(file);
      const response = {
        originalname: file.originalname,
        filename: file.filename,
      };
      return response;
    }
    @Get(':imgpath')
    seeUploadedFile(@Param('imgpath') image, @Res() res) {
      return res.sendFile(image, { root: './files' });
    }
}
