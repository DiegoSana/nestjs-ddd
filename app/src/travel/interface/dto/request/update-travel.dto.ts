import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsDate, IsInt, IsNotEmpty, MinDate } from 'class-validator';

export class TravelUpdateRequestDto {
  @ApiProperty({ example: 1, description: 'Route ID' })
  @IsInt()
  @IsNotEmpty()
  route_id: number;

  @ApiProperty({ example: 1, description: 'Driver ID' })
  @IsInt()
  @IsNotEmpty()
  driver_id: number;

  @ApiProperty({ example: new Date(), description: 'Travel date' })
  @IsDate()
  @Transform(({ value }) => value && new Date(value))
  @MinDate(new Date())
  @IsNotEmpty()
  date: Date;
}
