import { Module } from '@nestjs/common';
import { ProductosController } from './productos.controller';
import { ProductosService } from './productos.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Producto } from './entity/productos.entity';
import { AuthModule } from 'src/util/auth.module';
import { SupabaseService } from 'src/servicios/storageFile';

@Module({
  imports:[TypeOrmModule.forFeature([Producto]), AuthModule],
  controllers: [ProductosController ],
  providers: [ProductosService, SupabaseService]
})
export class ProductosModule {}
