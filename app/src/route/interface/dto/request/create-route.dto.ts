import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class RouteCreateRequestDto {
  @ApiProperty({ example: 'Centro - Llao Llao', description: 'Route name' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'Centro', description: 'Route from' })
  @IsString()
  @IsNotEmpty()
  from: string;

  @ApiProperty({ example: 'Llao Llao', description: 'Route to' })
  @IsString()
  @IsNotEmpty()
  to: string;
}
