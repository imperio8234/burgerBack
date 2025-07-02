import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    // Determinar el estado de la excepción
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    // Determinar el mensaje de la excepción
    const message =
      exception instanceof HttpException
        ? exception.getResponse()
        : 'Error interno del servidor';

    // Responder con un JSON consistente
    response.status(status).json({
      success: false,
      message:
        typeof message === 'string'
          ? message
          : (message as any)?.message || 'Error desconocido',
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
