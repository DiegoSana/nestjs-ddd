import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

import { UnexpectedDomainException } from 'src/vehicle/domain/exceptions/domain.exceptions';

@Catch(UnexpectedDomainException)
export class UnexpectedDomainExceptionFilter implements ExceptionFilter {
  catch(exception: UnexpectedDomainException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const statusCode = HttpStatus.INTERNAL_SERVER_ERROR;

    response
      .status(statusCode)
      .json({ statusCode, message: 'An unexpected error ocurred.' });
  }
}
