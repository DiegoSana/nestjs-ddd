import { BadRequestException } from '@nestjs/common';

export class VehicleNotFoundApplicationException extends BadRequestException {}
