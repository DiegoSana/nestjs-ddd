import { ApiProperty } from '@nestjs/swagger';
import { TravelPassenger } from 'src/travel/domain/entities/travel-passenger';

export class TravelPassengerResponseDto {
  @ApiProperty({ example: 1, description: 'Route ID' })
  id: number;
  @ApiProperty({ example: 'Diego', description: 'Travel passenger first name' })
  first_name: string;
  @ApiProperty({
    example: 'Sanabria',
    description: 'Travel passenger last name',
  })
  last_name: string;
  @ApiProperty({
    example: '123456789',
    description: 'Travel passenger identification number',
  })
  identification: string;

  constructor(passenger: TravelPassenger) {
    this.id = passenger.id;
    this.first_name = passenger.first_name;
    this.last_name = passenger.last_name;
    this.identification = passenger.identification;
  }
}
