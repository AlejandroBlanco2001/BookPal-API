import { HttpException } from '@nestjs/common';
export declare class PhysicalBookNotAvailable extends HttpException {
    constructor(physicalBookBarcode: string);
}
