import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { ProductosModule } from './productos/productos.module';
import { AdicionesModule } from './adiciones/adiciones.module';
import { PedidosModule } from './pedidos/pedidos.module';
import { PedidosItemsModule } from './pedidos_items/pedidos_items.module';
import { EmailModule } from './emailServices/email.module';

require('dotenv').config();


@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    TypeOrmModule.forRoot({
    type: 'mysql',
      host: process.env.DB_HOST,
      port: parseFloat(process.env.DB_PORT || '3306'),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
  }),
    UserModule,
    ProductosModule,
    AdicionesModule,
    PedidosModule,
    EmailModule,
    PedidosItemsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
