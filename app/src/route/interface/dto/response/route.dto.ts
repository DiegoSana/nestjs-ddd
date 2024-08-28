import { ApiProperty } from '@nestjs/swagger';
import { RouteProperties } from 'src/route/domain/entities/route';

export class RouteResponseDto {
  @ApiProperty({ example: 1, description: 'Route ID' })
  id: number;
  @ApiProperty({ example: 'Centro - Llao Llao', description: 'Route name' })
  name: string;
  @ApiProperty({ example: 'Centro', description: 'Route from' })
  from: string;
  @ApiProperty({ example: 'Llao Llao', description: 'Route to' })
  to: string;
  @ApiProperty({ example: new Date(), description: 'Route creation date' })
  created_at?: Date;
  @ApiProperty({
    example: new Date(),
    description: 'Route modification date',
  })
  updated_at?: Date;

  constructor(vehicle: RouteProperties) {
    this.id = vehicle.id;
    this.name = vehicle.name;
    this.from = vehicle.from;
    this.to = vehicle.to;
    this.created_at = vehicle.created_at;
    this.updated_at = vehicle.updated_at;
  }
}
