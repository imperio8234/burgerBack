import { Adicion } from 'src/adiciones/entity/adiciones.entity';
import { PedidoItem } from 'src/pedidos_items/entity/pedidos_item.entity';
import { Producto } from 'src/productos/entity/productos.entity';
import { Usuario } from 'src/user/userEntity/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable, OneToMany } from 'typeorm';

export type EstadoPedido = 'cancelado' | 'entregado' | 'pendiente';

@Entity()
export class Pedido {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    numeroPedido: string;

    @Column()
    fecha: string;

    @Column()
    direccion: string;

    @Column()
    comentario: string;

    @Column('float')
    total: number;

    @Column()
    estado: EstadoPedido;

    @ManyToOne(() => Usuario, usuario => usuario.pedidos)
    usuario: Usuario;

   

    @OneToMany(() => PedidoItem, item => item.pedido, { cascade: true })
    items: PedidoItem[];

}
