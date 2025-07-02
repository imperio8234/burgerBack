import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './userEntity/user.entity';
import { passwordManager } from 'src/util/passManager';
import { AuthModule } from 'src/util/auth.module';
import { EmailService } from 'src/emailServices/email.service';

@Module({
  imports:[TypeOrmModule.forFeature([Usuario]), AuthModule],
  controllers: [UserController],
  providers: [UserService, passwordManager, EmailService]
})
export class UserModule {}
