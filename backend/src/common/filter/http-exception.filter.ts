import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  BadRequestException,
} from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const httpResponse = ctx.getResponse();
    const status = exception.getStatus();

    if (exception instanceof BadRequestException) {
      const exceptionResponse = exception.getResponse();
      const validationErrors = exceptionResponse['message'];

      return httpResponse.status(status).json({
        timestamp: new Date().toISOString(),
        message: 'Validation failed',
        errors: validationErrors,
      });
    }

    httpResponse.status(status).json({
      timestamp: new Date().toISOString(),
      message: exception.message,
    });
  }
}
