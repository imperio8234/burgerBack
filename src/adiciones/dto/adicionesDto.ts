export type TipoProducto = 'salsa' | 'producto';

import { ApiProperty } from '@nestjs/swagger';

export class CreateAdicionDto {
  @ApiProperty({ example: 'Salsa BBQ' })
  nombre: string;

  @ApiProperty({ example: 5000 })
  precio: number;

  @ApiProperty({ example: 'Salsa especial para acompañar hamburguesas' })
  descripcion: string;

  @ApiProperty({ example: 'salsa', description: 'Puede ser salsa o producto' })
  tipo: TipoProducto;

  @ApiProperty({ example: 'http://ejemplo.com/imagen.jpg' })
  foto: string;
}
