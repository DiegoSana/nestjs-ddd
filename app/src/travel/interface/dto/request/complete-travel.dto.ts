import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsDate, IsInt, IsNotEmpty, IsString } from 'class-validator';

export class TravelCompleteRequestDto {
  @ApiProperty({ example: 1, description: 'Travel ID' })
  @IsInt()
  @IsNotEmpty()
  id: number;

  @ApiProperty({
    example: 'Travel completed successfully',
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
}
