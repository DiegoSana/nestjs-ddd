import { ApiProperty } from '@nestjs/swagger';

export class TravelDriverResponseDto {
  @ApiProperty({ example: 1, description: 'Driver ID' })
  id?: number;
  @ApiProperty({ example: 'Diego', description: 'Driver first name' })
  first_name: string;
  @ApiProperty({ example: 'Sanabria', description: 'Driver last name' })
  last_name: string;
  @ApiProperty({ example: '123456789', description: 'Driver license' })
  license: string;

  //TODO: fix when driver entity is created
  constructor(driver: any) {
    Object.assign(this, driver);
  }
}
