import { Adicion } from 'src/adiciones/entity/adiciones.entity';
import { Pedido } from 'src/pedidos/entity/pedidos.entity';
import { Producto } from 'src/productos/entity/productos.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable } from 'typeorm';

export type ItemTipo = 'hamburguesa' | 'adicion' | 'salsa' | 'acompañamiento';

@Entity()
export class PedidoItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Pedido, pedido => pedido.items, { onDelete: 'CASCADE' })
  pedido: Pedido;

  @Column()
  itemTipo: ItemTipo;

  @Column('int')
  cantidad: number;

  @Column('float')
  precio_unitario: number;

  @Column()
  item_id: string;

  @Column()
  nombre: string;
  @ManyToMany(() => Adicion, { cascade: true })
  @JoinTable()
  adiciones: Adicion[];

  @ManyToMany(() => Producto, { cascade: true })
  @JoinTable()
  acompanantes: Producto[];

}
