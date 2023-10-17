import { HttpException } from '@nestjs/common';
export declare class GenericError extends HttpException {
    constructor(place: string, error: string, operation: string);
}
