import { IsNotEmpty, IsNumber, IsString, Max, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export default class CreateRatingDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(5)
  rating: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  physical_book_barcode: string;
}
