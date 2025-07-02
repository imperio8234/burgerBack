import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from './userEntity/user.entity';
import { CreateUsuarioDto } from './dto/dtoUser';
import { passwordManager } from 'src/util/passManager';
import { JwtService } from '@nestjs/jwt';
import { EmailService } from 'src/emailServices/email.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
    private readonly passManager: passwordManager,
     private readonly jwtService: JwtService,
      private readonly emailService: EmailService // <-- nuevo
  ) { }
     // Generador simple de código
  private generarCodigo(length = 6): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    return Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
  }

  async create(createUsuarioDto: CreateUsuarioDto): Promise<Usuario | any> {
    try {
      const existUser = await this.usuarioRepository.findOne({
        where: {
          correo: createUsuarioDto.correo
        }
      })
      if (existUser) {
        return new HttpException("Usuario se encuentra registrado", HttpStatus.FOUND)
      }
      const contraseñaHash = await this.passManager.encriptPaswoord(createUsuarioDto.contraseña);
      createUsuarioDto.contraseña = contraseñaHash;
      const usuario = this.usuarioRepository.create(createUsuarioDto);

      // generar codigo
       const nuevoCodigo = this.generarCodigo();
    usuario.codigo = nuevoCodigo;
    await this.usuarioRepository.save(usuario);

    const html = `
      <h2>Hola ${usuario.nombre},</h2>
      <p>Este es tu nuevo código de verificación:</p>
      <h1 style="background:#f0f0f0;padding:10px;text-align:center">${nuevoCodigo}</h1>
    `;

    await this.emailService.sendEmail(
      usuario.correo,
      'Tu nuevo código de verificación',
      html
    );
      const usuarioGuardado = await this.usuarioRepository.save(usuario);
      
      const { ...user } = usuarioGuardado
      return {user: user, success: true, message: "debes de verificar el codigo"}
    } catch (error) {
      if (error instanceof HttpException) {
        return error
      }
      throw new HttpException('Error al crear el usuario', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAll(): Promise<Usuario[]> {
    return this.usuarioRepository.find();
  }

  async findOne(id: string): Promise<Usuario> {
    const usuario = await this.usuarioRepository.findOneBy({ id });
    if (!usuario) {
      throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
    }
    return usuario;
  }

  async update(id: string, data: Partial<Usuario>): Promise<Usuario> {
    const usuario = await this.findOne(id);
    Object.assign(usuario, data);
    try {
      return await this.usuarioRepository.save(usuario);
    } catch (error) {
      throw new HttpException('Error al actualizar el usuario', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async remove(id: string): Promise<void> {
    const usuario = await this.findOne(id);
    try {
      await this.usuarioRepository.remove(usuario);
    } catch (error) {
      throw new HttpException('Error al eliminar el usuario', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async login(correo: string, contraseña: string) {
    const user = await this.usuarioRepository.findOne({ where: { correo } });
    if (!user) {
      throw new HttpException('Credenciales inválidas', HttpStatus.UNAUTHORIZED);
    }
    const valid = await this.passManager.verifyPassword(contraseña, user.contraseña);
    if (!valid) {
      throw new HttpException('Credenciales inválidas', HttpStatus.UNAUTHORIZED);
    }
    const payload = { sub: user.id, correo: user.correo, nombre: user.nombre, rol: user.rol, foto: user.foto };
    return {
      user: payload,
      access_token: this.jwtService.sign(payload),
    };
  }



  async verificarCuenta(correo: string, codigo: string) {
    const user = await this.usuarioRepository.findOne({ where: { correo } });
    if (!user) {
      throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
    }
    if (user.verificado) {
      throw new HttpException('Cuenta ya verificada', HttpStatus.BAD_REQUEST);
    }
    if (user.codigo !== codigo) {
      throw new HttpException('Código incorrecto', HttpStatus.UNAUTHORIZED);
    }

    user.verificado = true;
    await this.usuarioRepository.save(user);
    return { message: 'Cuenta verificada exitosamente' };
  }

  async reenviarCodigo(correo: string) {
    const user = await this.usuarioRepository.findOne({ where: { correo } });
    if (!user) {
      throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
    }

    const nuevoCodigo = this.generarCodigo();
    user.codigo = nuevoCodigo;
    await this.usuarioRepository.save(user);

    const html = `
      <h2>Hola ${user.nombre},</h2>
      <p>Este es tu nuevo código de verificación:</p>
      <h1 style="background:#f0f0f0;padding:10px;text-align:center">${nuevoCodigo}</h1>
    `;

    await this.emailService.sendEmail(
      user.correo,
      'Tu nuevo código de verificación',
      html
    );

    return { message: 'Código reenviado al correo registrado' };
  }
}
