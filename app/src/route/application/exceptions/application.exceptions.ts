import { BadRequestException } from '@nestjs/common';

export class RouteNotFoundApplicationException extends BadRequestException {}
