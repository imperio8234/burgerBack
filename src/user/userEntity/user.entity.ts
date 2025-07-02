import { Pedido } from 'src/pedidos/entity/pedidos.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class Usuario {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  nombre: string;

  @Column({ unique: true })
  correo: string;

  @Column()
  contrasena: string;

  @Column({ default: 'cliente' })
  rol: 'admin' | 'cliente';

  @Column({ nullable: true })
  foto: string;

  @Column({ nullable: true })
  codigo: string;

  @Column({ nullable: true , default: false})
  verificado: boolean;

  @OneToMany(() => Pedido, (pe)=> pe.usuario)
  pedidos: Pedido


  
}
