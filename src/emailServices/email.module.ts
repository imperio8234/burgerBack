import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { NotificacionesController } from './email.controller'; // <- Asegúrate de importar el controlador

@Module({
  controllers: [NotificacionesController], // <-- Agrégalo aquí
  providers: [EmailService],
  exports: [EmailService],
})
export class EmailModule {}
