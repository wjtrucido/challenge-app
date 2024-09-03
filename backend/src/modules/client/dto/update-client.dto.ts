import { PartialType } from '@nestjs/mapped-types';
import { CreateClientRequestDto } from './create-client-request.dto';
import { IsEmail, IsOptional, IsString, IsBoolean } from 'class-validator';

export class UpdateClientDto extends PartialType(CreateClientRequestDto) {
  @IsOptional()
  @IsString()
  fullName: string;

  @IsOptional()
  @IsString()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  phone: string;

  @IsOptional()
  @IsString()
  address: string;

  @IsOptional()
  @IsBoolean()
  active?: boolean;
}
