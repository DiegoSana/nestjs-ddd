import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsDate, IsInt, IsNotEmpty, IsString } from 'class-validator';

export type TravelCompleteResponseDtoProperties = {
  id: number;
  comment: string;
  date: Date;
  status: number;
};

export class TravelCompleteResponseDto {
  @ApiProperty({ example: 1, description: 'Travel ID' })
  @IsInt()
  @IsNotEmpty()
  id: number;

  @ApiProperty({
    example: 'Completed successfully',
    description: 'Travel comment',
  })
  @IsString()
  @IsNotEmpty()
  comment: string;

  @ApiProperty({ example: new Date(), description: 'Travel complete date' })
  @IsDate()
  @Transform(({ value }) => value && new Date(value))
  @IsNotEmpty()
  date: Date;

  @ApiProperty({ example: 1, description: 'Travel status' })
  @IsInt()
  @IsNotEmpty()
  status: number;

  constructor(properties: TravelCompleteResponseDtoProperties) {
    this.id = properties.id;
    this.comment = properties.comment;
    this.date = properties.date;
    this.status = properties.status;
  }
}
