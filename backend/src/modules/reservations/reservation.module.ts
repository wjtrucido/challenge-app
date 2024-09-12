import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Reservation, ReservationSchema } from './entity/reservation.entity';
import { ReservationController } from './controller/reservation.controller';
import { ReservationService } from './service/reservation.service';
import { ReservationRepository } from './repository/reservation.repository';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Reservation.name, schema: ReservationSchema },
    ]),
  ],
  controllers: [ReservationController],
  providers: [ReservationRepository, ReservationService, ConfigService],
  exports: [MongooseModule],
})
export class ReservationModule { }
