import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { VehicleNotFoundApplicationException } from 'src/vehicle/application/exceptions/application.exceptions';

@Catch(VehicleNotFoundApplicationException)
export class NotFoundApplicationExceptionFilter implements ExceptionFilter {
  catch(exception: VehicleNotFoundApplicationException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const statusCode = HttpStatus.NOT_FOUND;

    response
      .status(statusCode)
      .json({ statusCode, message: exception.message });
  }
}
