import { IsNotEmpty, IsString } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';
export class CreateLoanDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  physical_book_barcode: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  physical_book_collection_name: string;
}
