import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RestaurantesModule } from './modules/restaurantes/restaurantes.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      connectTimeout  : 60 * 60 * 2000,
      acquireTimeout  : 60 * 60 * 2000,
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'try',
      password: 'sasa',
      database: 'try',
      entities: [__dirname + '/model/**/*{.ts,.js}'],
      synchronize: false,
      autoLoadEntities: true,
    }),
    RestaurantesModule,
    MulterModule.register({
      dest: '/files',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(){
    console.log(__dirname + '/model/**/*{.ts,.js}');
  }
  
}
