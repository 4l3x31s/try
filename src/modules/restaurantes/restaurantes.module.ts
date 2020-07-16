import { Module } from '@nestjs/common';
import { PaisProvider } from './provider/pais.provider';
import { PaisController } from './controller/pais/pais.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Categoria } from '../../model/Categoria';
import { Ciudad } from '../../model/Ciudad';
import { Empresa } from '../../model/Empresa';
import { Horario } from '../../model/Horario';
import { Menu } from '../../model/Menu';
import { Pais } from 'src/model/Pais';
import { Reserva } from '../../model/Reserva';
import { Sucursal } from '../../model/Sucursal';
import { Usuario } from '../../model/Usuario';
import { CiudadProvider } from './provider/ciudad.provider';
import { CiudadController } from './controller/ciudad/ciudad.controller';
import { CategoriaProvider } from './provider/categoria.provider';
import { CategoriaController } from './controller/categoria/categoria.controller';
import { EmpresaProvider } from './provider/empresa.provider';
import { EmpresaController } from './controller/empresa/empresa.controller';
import { HorarioProvider } from './provider/horario.provider';
import { HorarioController } from './controller/horario/horario.controller';
import { MenuProvider } from './provider/menu.provider';
import { MenuController } from './controller/menu/menu.controller';
import { ReservaProvider } from './provider/reserva.provider';
import { ReservaController } from './controller/reserva/reserva.controller';
import { SucursalProvider } from './provider/sucursal.provider';
import { SucursalController } from './controller/sucursal/sucursal.controller';
import { UsuarioProvider } from './provider/usuario.provider';
import { UsuarioController } from './controller/usuario/usuario.controller';
import { LoginController } from './auth/login/login.controller';
import { FotosSucursalController } from './controller/fotos-sucursal/fotos-sucursal.controller';
import { FotosSucursalProvider } from './provider/fotos-sucursal.provider';
import { FotoSucursal } from '../../model/FotoSucursal';


@Module({
  imports:[
    TypeOrmModule.forFeature([
      Categoria,
      Ciudad,
      Empresa,
      Horario,
      Menu,
      Pais,
      Reserva,
      Sucursal,
      Usuario,
      FotoSucursal
    ])
  ],
  providers: [
    PaisProvider,
    CiudadProvider,
    CategoriaProvider,
    EmpresaProvider,
    HorarioProvider,
    MenuProvider,
    ReservaProvider,
    SucursalProvider,
    UsuarioProvider,
    FotosSucursalProvider,
  ],
  controllers: [
    PaisController,
    CiudadController,
    CategoriaController,
    EmpresaController,
    HorarioController,
    MenuController,
    ReservaController,
    SucursalController,
    UsuarioController,
    LoginController,
    FotosSucursalController
  ]
})
export class RestaurantesModule {}
