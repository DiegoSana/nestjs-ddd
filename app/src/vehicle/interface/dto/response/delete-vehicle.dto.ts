import { ApiProperty } from '@nestjs/swagger';

export class DeleteVehicleResponseDto {
  @ApiProperty({ example: true, description: 'Deletion status' })
  success: boolean;

  constructor(success: boolean) {
    this.success = success;
  }
}
