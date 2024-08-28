import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  InternalServerErrorException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch()
class AllExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const statusCode = HttpStatus.INTERNAL_SERVER_ERROR;

    console.log(exception);

    response
      .status(statusCode)
      .json({ statusCode, message: 'An unexpected error ocurred.' });
  }
}

@Catch(HttpException)
class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const statusCode = exception.getStatus();

    console.log(exception);

    response
      .status(statusCode)
      .json({ statusCode, message: exception.message });
  }
}

@Catch(BadRequestException)
class BadRequestExceptionFilter implements ExceptionFilter {
  catch(exception: BadRequestException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const statusCode = exception.getStatus();

    console.log(exception);

    response
      .status(statusCode)
      .json({ statusCode, erroor: exception.getResponse() });
  }
}

@Catch(InternalServerErrorException)
class InternalServerErrorExceptionFilter implements ExceptionFilter {
  catch(exception: InternalServerErrorException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const statusCode = exception.getStatus();

    console.log(exception);

    response
      .status(statusCode)
      .json({ statusCode, message: 'An unexpected error ocurred.' });
  }
}

export default [
  AllExceptionFilter,
  HttpExceptionFilter,
  InternalServerErrorExceptionFilter,
  BadRequestExceptionFilter,
];
