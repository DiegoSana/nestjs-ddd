import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class UpdateVehicleRequestDto {
  @ApiProperty({ example: 'NRS360', description: 'Vehicle identification' })
  @IsString()
  @IsNotEmpty()
  vehicle_id: string;

  @ApiProperty({ example: 'Diegos car', description: 'Vehicle alias' })
  @IsString()
  @IsNotEmpty()
  alias: string;

  @ApiProperty({ example: '3', description: 'Vehicle capacity' })
  @IsInt()
  @IsNotEmpty()
  capacity: number;
}
