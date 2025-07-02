import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export type TipoProducto = 'salsa' | 'producto';

@Entity()
export class Adicion {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nombre: string;

  @Column('float')
  precio: number;

  @Column()
  descripcion: string;

  @Column()
  tipo: TipoProducto;

  @Column()
  foto: string;
}
