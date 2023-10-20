import { IsNotEmpty, IsNumber } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';
export class CreateLoanDto {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  physical_book_barcode: string;
  physical_book_collection_name: string;
}
