import { PartialType } from '@nestjs/mapped-types';
import { CreateReservationRequestDto } from './create-reservation-request.dto';
import {
  IsNotEmpty,
  IsMongoId,
  IsOptional,
  IsString,
  IsDate,
  IsBoolean,
} from 'class-validator';
import { Types } from 'mongoose';

export class UpdateReservationDto extends PartialType(
  CreateReservationRequestDto,
) {
  @IsOptional()
  @IsNotEmpty()
  @IsMongoId()
  clientId: Types.ObjectId;

  @IsOptional()
  @IsNotEmpty()
  @IsMongoId()
  serviceId: Types.ObjectId;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  date: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  hour: string;

  @IsOptional()
  duration: number;

  @IsOptional()
  @IsNotEmpty()
  @IsBoolean()
  canceled: boolean;

  @IsOptional()
  @IsNotEmpty()
  @IsBoolean()
  active: boolean;
}
