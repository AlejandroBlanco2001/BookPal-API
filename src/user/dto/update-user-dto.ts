import {
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsStrongPassword,
  IsUrl,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDTO {
  @ApiProperty()
  @IsString()
  @IsUrl()
  @IsNotEmpty()
  @IsOptional()
  profile_image?: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  first_name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  second_name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  last_name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  second_last_name: string;

  @ApiProperty()
  @IsDateString()
  @IsNotEmpty()
  @IsOptional()
  date_of_birth: Date;

  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  @IsOptional()
  email: string;

  @ApiProperty()
  @IsStrongPassword()
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  password: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  academic_program: string;
}
