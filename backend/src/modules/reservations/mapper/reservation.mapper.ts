import { Reservation } from '../entity/reservation.entity';
import { ReservationResponseDto } from '../dto/reservation-response.dto';

export class ReservationMapper {
  static createReservationResponseDtoFrom(
    reservation: Reservation,
  ): ReservationResponseDto {
    return {
      id: reservation.id,
      clientId: reservation.clientId,
      serviceId: reservation.serviceId,
      date: reservation.date,
      hour: reservation.hour,
      duration: reservation.duration,
      canceled: reservation.canceled,
    };
  }
}
