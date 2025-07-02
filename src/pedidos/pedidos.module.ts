import { Module } from '@nestjs/common';
import { PedidosController } from './pedidos.controller';
import { PedidosService } from './pedidos.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pedido } from './entity/pedidos.entity';
import { Usuario } from 'src/user/userEntity/user.entity';
import { PedidoItem } from 'src/pedidos_items/entity/pedidos_item.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Pedido, Usuario, PedidoItem])],
  controllers: [PedidosController],
  providers: [PedidosService,  Usuario, PedidoItem]
})
export class PedidosModule {}
