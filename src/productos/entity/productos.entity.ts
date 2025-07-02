import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Producto {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nombre: string;

  @Column()
  ingredientes: string;

  @Column('float')
  precio: number;

  @Column()
  descripcion: string;

  @Column()
  tipo: string;

  @Column()
  foto: string;
}
