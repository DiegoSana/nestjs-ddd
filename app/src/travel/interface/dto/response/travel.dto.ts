import { ApiProperty } from '@nestjs/swagger';
import { TravelRouteResponseDto } from './travel-route.dto';
import { TravelDriverResponseDto } from './travel-driver.dto';
import { TravelPassengerResponseDto } from './travel-passenger.dto';

export type TravelResponseDtoProperties = Required<{
  id: number;
  route: TravelRouteResponseDto;
  driver: TravelDriverResponseDto;
  date: Date;
  passengers: TravelPassengerResponseDto[];
}>;

export class TravelResponseDto {
  @ApiProperty({ example: 1, description: 'Travel ID' })
  id: number;
  @ApiProperty({ example: TravelRouteResponseDto, description: 'Travel route' })
  route: TravelRouteResponseDto;
  @ApiProperty({
    example: TravelDriverResponseDto,
    description: 'Travel driver',
  })
  driver: TravelDriverResponseDto;
  @ApiProperty({ example: new Date(), description: 'Travel date' })
  date: Date;
  @ApiProperty({
    type: TravelPassengerResponseDto,
    example: TravelPassengerResponseDto,
    isArray: true,
    description: 'Travel passengers',
  })
  passengers: TravelPassengerResponseDto[];
  @ApiProperty({ example: new Date(), description: 'Travel creation date' })
  created_at?: Date;
  @ApiProperty({
    example: new Date(),
    description: 'Travel modification date',
  })
  updated_at?: Date;

  constructor(travelResponseDtoProperties: TravelResponseDtoProperties) {
    Object.assign(this, travelResponseDtoProperties);
  }
}
