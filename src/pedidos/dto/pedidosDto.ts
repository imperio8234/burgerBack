import { ApiProperty } from '@nestjs/swagger';
import { ItemTipo } from 'src/pedidos_items/entity/pedidos_item.entity';

export type EstadoPedido = 'cancelado' | 'entregado' | 'pendiente';

export class PedidoItemDto {
  @ApiProperty({ example: 'producto', enum: ['producto', 'servicio'], description: 'Tipo de ítem' })
  itemTipo: ItemTipo;

  @ApiProperty({ example: 2, description: 'Cantidad del ítem' })
  cantidad: number;

  @ApiProperty({ example: 12500, description: 'Precio unitario del ítem' })
  precio_unitario: number;

  @ApiProperty({ example: 'item_id_abc123', description: 'ID del ítem relacionado' })
  item_id: string;
}

export class CreatePedidoDto {
  @ApiProperty({ example: 'PED12345', description: 'Número de referencia del pedido' })
  numeroPedido: string;

  @ApiProperty({ example: '2025-06-30T12:00:00Z', description: 'Fecha del pedido en formato ISO 8601' })
  fecha: string;

  @ApiProperty({ example: 25000, description: 'Valor total del pedido' })
  total: number;
  
  @ApiProperty({example: "cr 13 6 a 26", description: "registro de direccio  para el pedido"})
  direccion: string;

  @ApiProperty({example: "el pedido llegara en 30 minutos", description: "descripcion del pedido"})
  comentario: string;

  @ApiProperty({
    example: 'pendiente',
    enum: ['cancelado', 'entregado', 'pendiente'],
    description: 'Estado actual del pedido'
  })
  estado: EstadoPedido;

  @ApiProperty({ example: '84cd5e28-2312-495d-9b06-569cd6003c78', description: 'ID del usuario que realizó el pedido' })
  usuario: string;

  @ApiProperty({
    type: [PedidoItemDto],
    description: 'Lista de ítems asociados al pedido',
    example: [
      {
        itemTipo: 'producto',
        cantidad: 2,
        precio_unitario: 12500,
        item_id: 'item_001'
      },
      {
        itemTipo: 'servicio',
        cantidad: 1,
        precio_unitario: 10000,
        item_id: 'item_002'
      }
    ]
  })
  items: PedidoItemDto[];
}
