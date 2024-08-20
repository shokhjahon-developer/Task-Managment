import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({ example: 'Work' })
  @IsNotEmpty()
  @IsString()
  @MaxLength(64)
  name: string;
}
