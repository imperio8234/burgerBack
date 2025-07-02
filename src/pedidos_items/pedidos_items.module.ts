import { Module } from '@nestjs/common';
import { PedidosItemsController } from './pedidos_items.controller';
import { PedidosItemsService } from './pedidos_items.service';

@Module({
  controllers: [PedidosItemsController],
  providers: [PedidosItemsService]
})
export class PedidosItemsModule {}
