import { PartialType } from '@nestjs/mapped-types';
import { CreateServiceRequestDto } from './create-service-request.dto';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class UpdateServiceDto extends PartialType(CreateServiceRequestDto) {
  @IsOptional()
  @IsString()
  readonly description?: string;

  @IsOptional()
  @IsBoolean()
  readonly active?: boolean;
}
