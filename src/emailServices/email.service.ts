import { Injectable, Logger } from '@nestjs/common';
import { Resend } from 'resend';

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);
  private readonly resend = new Resend(process.env.RESEND_API_KEY);

  async sendEmail(to: string, subject: string, html: string) {
    console.log("api", process.env.RESEND_API_KEY)
    try {
      const { data, error } = await this.resend.emails.send({
        from: 'villa-app@villacontrol.online', 
        to,
        subject,
        html,
      });

      if (error) {
        this.logger.error('Error de Resend:', error);
        throw new Error(error.message);
      }

      this.logger.log(`Correo enviado a ${to}`);
      return data;
    } catch (error) {
      this.logger.error('Error enviando correo:', error.message);
      throw new Error('No se pudo enviar el correo');
    }
  }

  generarHtmlFactura(nombre: string, pedido: any): string {
  const itemsHtml = pedido.items.map((item: any) => {
    const adiciones = item.adiciones?.map((a: any) => `<li>${a.nombre} ($${a.precio})</li>`).join("") || "";
    const acompanantes = item.acompanantes?.map((a: any) => `<li>${a.nombre} ($${a.precio})</li>`).join("") || "";

    return `
      <div style="display: flex; gap: 12px; margin-bottom: 16px; border-bottom: 1px solid #ccc; padding-bottom: 12px;">
        <img src="${item.foto?.startsWith('http') ? item.foto : 'https://via.placeholder.com/60'}" width="60" height="60" style="border-radius: 8px; object-fit: cover;" />
        <div style="font-size: 14px;">
          <p style="margin: 0; font-weight: bold;">${item.nombre}</p>
          <p style="margin: 0;">Cantidad: ${item.cantidad}</p>
          <p style="margin: 0;">Precio unitario: $${item.precio_unitario}</p>
          ${adiciones ? `<p style="margin: 0;">Adiciones:<ul>${adiciones}</ul></p>` : ""}
          ${acompanantes ? `<p style="margin: 0;">Acompañantes:<ul>${acompanantes}</ul></p>` : ""}
        </div>
      </div>
    `;
  }).join("");

  return `
    <html>
      <body style="font-family: Arial, sans-serif; background: #f9f9f9; padding: 24px; color: #333;">
        <div style="max-width: 600px; margin: auto; background: white; border-radius: 10px; padding: 24px;">
          <h2 style="color: #111;">Hola ${nombre},</h2>
          <p>¡Gracias por tu pedido! A continuación te enviamos la confirmación:</p>

          <div style="font-size: 14px;">
            <p><strong>Pedido:</strong> #${pedido.numeroPedido}</p>
            <p><strong>Fecha:</strong> ${pedido.fecha}</p>
            <p><strong>Estado:</strong> ${pedido.estado}</p>
            <p><strong>Usuario:</strong> ${pedido.usuario}</p>
            ${pedido.direccion ? `<p><strong>Dirección:</strong> ${pedido.direccion}</p>` : ""}
            ${pedido.comentario ? `<p><strong>Comentario:</strong> ${pedido.comentario}</p>` : ""}
          </div>

          <hr style="margin: 24px 0;" />
          ${itemsHtml}

          <h3 style="text-align: right;">Total: $${pedido.total.toFixed(2)}</h3>

          <hr style="margin: 24px 0;" />
          <p style="font-size: 16px;">Tu <strong>código de verificación</strong> es:</p>
          <div style="font-size: 24px; background: #eee; padding: 12px; text-align: center; border-radius: 8px;">
           
          </div>

          <p style="margin-top: 24px;">Gracias por confiar en nosotros.</p>
        </div>
      </body>
    </html>
  `;
}

}
