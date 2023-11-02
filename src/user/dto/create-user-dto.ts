import {
  IsBoolean,
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsStrongPassword,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  company_id: number;

  @ApiProperty()
  @IsString()
  @IsOptional()
  profile_image: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  first_name: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  second_name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  last_name: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  second_last_name: string;

  @ApiProperty()
  @IsDateString()
  date_of_birth: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsStrongPassword()
  password: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  academic_program: string;

  @ApiProperty()
  @IsBoolean()
  is_admin: boolean;

  @ApiProperty()
  @IsString()
  phone_token: string;
}
