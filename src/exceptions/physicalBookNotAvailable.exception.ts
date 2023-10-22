import { HttpException, HttpStatus } from '@nestjs/common';

export class PhysicalBookNotAvailable extends HttpException {
  constructor(physicalBookBarcode: string) {
    super(
      `The book with barcode ${physicalBookBarcode} is not available for loan due capacity issues.`,
      HttpStatus.BAD_REQUEST,
    );
  }
}
