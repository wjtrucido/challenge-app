import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateClientRequestDto {
  @IsNotEmpty()
  @IsString()
  fullName: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  phone: string;

  @IsString()
  address: string;
}
