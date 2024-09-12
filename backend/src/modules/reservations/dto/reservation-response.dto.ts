import { Types } from 'mongoose';
export interface ReservationResponseDto {
  id: Types.ObjectId;
  clientId: Types.ObjectId;
  serviceId: Types.ObjectId;
  date: Date;
  hour: string;
  duration: string;
  canceled: boolean;
}
