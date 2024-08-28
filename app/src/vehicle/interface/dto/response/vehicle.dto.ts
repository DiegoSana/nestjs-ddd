import { ApiProperty } from '@nestjs/swagger';
import { VehicleProperties } from 'src/vehicle/domain/entities/vehicle';

export class VehicleResponseDto {
  @ApiProperty({ example: 1, description: 'Vehicle ID' })
  id: number;
  @ApiProperty({ example: 'NRS360', description: 'Vehicle identification' })
  vehicle_id: string;
  @ApiProperty({ example: "Diego's car", description: 'Vehicle alias' })
  alias: string;
  @ApiProperty({ example: '4', description: 'Vehicle capacity' })
  capacity: number;
  @ApiProperty({ example: new Date(), description: 'Vehicle creation date' })
  created_at?: Date;
  @ApiProperty({
    example: new Date(),
    description: 'Vehicle modification date',
  })
  updated_at?: Date;

  constructor(vehicle: VehicleProperties) {
    this.id = vehicle.id;
    this.vehicle_id = vehicle.vehicle_id;
    this.alias = vehicle.alias;
    this.capacity = vehicle.capacity;
    this.created_at = vehicle.created_at;
    this.updated_at = vehicle.updated_at;
  }
}
