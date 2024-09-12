import { IsNotEmpty, IsString } from 'class-validator';

export class CreateServiceRequestDto {
  @IsNotEmpty()
  @IsString()
  description: string;
}
