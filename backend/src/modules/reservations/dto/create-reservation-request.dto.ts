import {
  IsDateString,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { Types } from 'mongoose';

export class CreateReservationRequestDto {
  @IsNotEmpty()
  @IsMongoId()
  clientId: Types.ObjectId;

  @IsNotEmpty()
  @IsMongoId()
  serviceId: Types.ObjectId;

  @IsNotEmpty()
  @IsString()
  date: string;

  @IsNotEmpty()
  @IsString()
  hour: string;

  @IsOptional()
  duration: number;
}
