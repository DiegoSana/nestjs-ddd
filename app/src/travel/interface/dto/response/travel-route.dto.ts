import { ApiProperty } from '@nestjs/swagger';
import { IRoute } from 'express';

export class TravelRouteResponseDto {
  @ApiProperty({ example: 1, description: 'Route ID' })
  id?: number;
  @ApiProperty({ example: 'Centro - Llao Llao', description: 'Route name' })
  name: string;
  @ApiProperty({ example: 'Centro', description: 'Route from' })
  from: string;
  @ApiProperty({ example: 'Llao Llao', description: 'Route to' })
  to: string;

  constructor(route: IRoute) {
    Object.assign(this, route);
  }
}
