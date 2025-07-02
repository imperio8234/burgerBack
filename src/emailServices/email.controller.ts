// src/email/email.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { EmailService } from './email.service';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

@ApiTags('Notificaciones')
@Controller('notificaciones')
export class NotificacionesController {
  constructor(private readonly emailService: EmailService) {}

  @Post('enviar-correo')
  @ApiOperation({ summary: 'Enviar correo con factura y código' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        correo: { type: 'string', example: 'cliente@ejemplo.com' },
        nombre: { type: 'string', example: 'Cliente Ejemplo' },
        pedido: {
          type: 'object',
          example: {
            numeroPedido: '223',
            fecha: '2025-07-02',
            total: 30000,
            estado: 'pendiente',
            usuario: 'cliente123',
            direccion: '',
            comentario: '',
            items: [
              {
                item_id: 'abc123',
                itemTipo: 'producto',
                cantidad: 1,
                precio_unitario: 15000,
                nombre: 'Hamburguesa doble carne',
                foto: 'madera.jpg',
                adiciones: [],
                acompanantes: []
              },
            ],
          },
        },
      },
    },
  })
  @ApiResponse({ status: 201, description: 'Correo enviado correctamente.' })
  @ApiResponse({ status: 400, description: 'Error al enviar el correo.' })
  async enviar(@Body() body: { correo: string; nombre: string; pedido: any; codigo: string }) {
    const html = this.emailService.generarHtmlFactura(body.nombre, body.pedido);
    return this.emailService.sendEmail(
      body.correo,
      `Pedido #${body.pedido.numeroPedido} - Confirmación`,
      html,
    );
  }

  
}
