import { IsString, IsEmail, IsIn, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUsuarioDto {

  @ApiProperty({ example: 'Juan Perez' })
  @IsString()
  nombre: string;

  @ApiProperty({ example: 'juan@example.com' })
  @IsEmail()
  correo: string;

  @ApiProperty({ example: 'contraseñaSegura123' })
  @IsString()
  contraseña: string;

  @ApiProperty({ example: 'admin', enum: ['admin', 'cliente'] })
  @IsIn(['admin', 'cliente'])
  rol: 'admin' | 'cliente';

  @ApiPropertyOptional({ example: 'https://example.com/foto.jpg' })
  @IsOptional()
  @IsString()
  foto: string | Buffer;;

  @ApiPropertyOptional({ example: '1234567' })
  @IsString()
  codigo: string;

  @ApiPropertyOptional({ example: 'false' })
  @IsString()
  verificado: boolean;
}
  
