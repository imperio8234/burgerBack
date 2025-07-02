import { ApiProperty } from '@nestjs/swagger';

export class CreateProductoDto {
  @ApiProperty({ example: 'Hamburguesa doble carne' })
  nombre: string;

  @ApiProperty({ example: 'Carne, queso, pan' })
  ingredientes: string;

  @ApiProperty({ example: 15000 })
  precio: number;

  @ApiProperty({ example: 'Deliciosa hamburguesa con ingredientes frescos' })
  descripcion: string;

  @ApiProperty({ example: 'hamburguesa', description: 'tipo de producto hamburguesa o gaseosa' })
  tipo: string;

  @ApiProperty({ example: 'http://ejemplo.com/imagen.jpg' })
  foto: string;
}