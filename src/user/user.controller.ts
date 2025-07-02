import { Controller, Post, Body, UseGuards, Get, Param, Put, Delete } from '@nestjs/common';
import { ApiTags, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUsuarioDto } from './dto/dtoUser';
import { JwtAuthGuard } from 'src/util/authGuard';

@ApiTags('Usuarios')
@ApiBearerAuth()
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
  ) {}

  @Post('verificar-cuenta')
verificarCuenta(@Body() body: { correo: string; codigo: string }) {
  return this.userService.verificarCuenta(body.correo, body.codigo);
}

@Post('reenviar-codigo')
reenviarCodigo(@Body() body: { correo: string }) {
  return this.userService.reenviarCodigo(body.correo);
}


  @Post()
  create(@Body() createUsuarioDto: CreateUsuarioDto) {
    return this.userService.create(createUsuarioDto);
  }

  @Post('login')
  @ApiBody({
    schema: {
      properties: {
        correo: { type: 'string', example: 'juan@example.com' },
        contraseña: { type: 'string', example: 'contraseñaSegura123' },
      },
    },
  })
  login(@Body() body: { correo: string; contraseña: string }) {
    return this.userService.login(body.correo, body.contraseña);
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
  update(@Param('id') id: string, @Body() data: Partial<CreateUsuarioDto>) {
    return this.userService.update(id, data);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
