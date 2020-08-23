import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RestaurantesModule } from './modules/restaurantes/restaurantes.module';
import { ConfigModule } from '@nestjs/config';

import * as dotenv from 'dotenv';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      connectTimeout  : 60 * 60 * 2000,
      acquireTimeout  : 60 * 60 * 2000,
      type: 'mysql',
      host: '108.163.210.34',
      port: 3306,
      username: 'lhwzrcxi_try_user',
      password: 'N0r3cu3rd0$',
      database: 'lhwzrcxi_try_bolivia',
      entities: [__dirname + '/model/**/*{.ts,.js}'],
      synchronize: false,
      autoLoadEntities: true,
    }),
    RestaurantesModule,
    MulterModule.register({
      dest: __dirname + '/files',
    }),
    ConfigModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(){
    console.log(__dirname + '/model/**/*{.ts,.js}');
  }
  
}
