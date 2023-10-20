import {
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
