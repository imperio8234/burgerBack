import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest(err: any, user: any, info: any) {
    console.log(err, user, info)
    if (err || !user) {
      throw new UnauthorizedException('No está autenticado o el token no es válido');
    }
    return user;
  }
}
