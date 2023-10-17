import { IsHexColor, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCompanyDTO {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  logo: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsHexColor()
  @IsOptional()
  primary_color: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsHexColor()
  @IsOptional()
  secondary_color: string;
}
