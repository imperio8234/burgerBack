import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Param,
  Put,
  Delete,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiBody, ApiBearerAuth, ApiConsumes } from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUsuarioDto } from './dto/dtoUser';
import { JwtAuthGuard } from 'src/util/authGuard';

@ApiTags('Usuarios')
@ApiBearerAuth()
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('verificar-cuenta')
  verificarCuenta(@Body() body: { correo: string; codigo: string }) {
    return this.userService.verificarCuenta(body.correo, body.codigo);
  }

  @Post('reenviar-codigo')
  reenviarCodigo(@Body() body: { correo: string }) {
    return this.userService.reenviarCodigo(body.correo);
  }

  @Post()
  @UseInterceptors(FileInterceptor('foto'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        nombre: { type: 'string', example: 'Juan Perez' },
        correo: { type: 'string', example: 'juan@example.com' },
        contrasena: { type: 'string', example: '12345678' },
        rol: { type: 'string', enum: ['admin', 'cliente'] },
        foto: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  create(
  @Body() createUsuarioDto: CreateUsuarioDto,
  @UploadedFile() foto: Express.Multer.File
) {
  if (foto) {
    createUsuarioDto.foto = foto.buffer;
  }
  console.log("Usuario", createUsuarioDto)
  return this.userService.create(createUsuarioDto);
}
  @Post('login')
  @ApiBody({
    schema: {
      properties: {
        correo: { type: 'string', example: 'juan@example.com' },
        contrasena: { type: 'string', example: 'contraseñaSegura123' },
      },
    },
  })
  login(@Body() body: { correo: string; contrasena: string }) {
    return this.userService.login(body.correo, body.contrasena);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  @UseInterceptors(FileInterceptor('foto'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        nombre: { type: 'string' },
        correo: { type: 'string' },
        contrasena: { type: 'string' },
        rol: { type: 'string', enum: ['admin', 'cliente'] },
        foto: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  update(
    @Param('id') id: string,
    @Body() data: Partial<CreateUsuarioDto>,
    @UploadedFile() foto: Express.Multer.File,
  ) {
    if (foto) {
      data.foto = foto.buffer;
    }
    return this.userService.update(id, data);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
