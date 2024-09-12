import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Service extends Document {
  @Prop({ required: true })
  description?: string;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({
    default: Date.now,
  })
  updatedAt: Date;

  @Prop({ default: true })
  active: boolean;
}

export const ServiceSchema = SchemaFactory.createForClass(Service);
