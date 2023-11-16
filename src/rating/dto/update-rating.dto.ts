import { IsNotEmpty, IsNumber, Max, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export default class UpdateRatingDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(5)
  rating: number;
}
