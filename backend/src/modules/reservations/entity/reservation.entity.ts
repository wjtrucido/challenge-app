import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { IsDateString, IsMongoId } from 'class-validator';

@Schema()
export class Reservation extends Document {
  //@Prop({ require: true, ref: 'Reservation' })
  //reservation: Types.ObjectId;

  @Prop({ require: true, ref: 'client' })
  @IsMongoId()
  clientId: Types.ObjectId;

  @Prop({ require: true, ref: 'Service' })
  serviceId: Types.ObjectId;

  @Prop({ require: true })
  @IsDateString()
  date: Date;

  @Prop({ require: true })
  @IsDateString()
  hour: string;

  @Prop()
  duration: string;

  @Prop({ default: false })
  canceled: boolean;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({
    default: Date.now,
  })
  updatedAt: Date;

  @Prop({ default: true })
  active: boolean;
}

export const ReservationSchema = SchemaFactory.createForClass(Reservation);
