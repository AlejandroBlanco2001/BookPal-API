import { IsNotEmpty, IsString } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';
export class ReturnLoanDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  dynamic_code: string;
}
