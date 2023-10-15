import { IsNotEmpty, IsNumber } from 'class-validator';
export class CreateLoanDto {
  @IsNotEmpty()
  @IsNumber()
  physical_book_barcode: number;
}
