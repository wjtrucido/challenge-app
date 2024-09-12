import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PaginationParamsDto } from '../../../common/dto/pagination-params.dto';
import { CreateReservationRequestDto } from '../dto/create-reservation-request.dto';
import { PaginatedResponseDto } from '../../../common/dto/paginated-response.dto';
import { UpdateReservationDto } from '../dto/update-reservation.dto';
import { Reservation } from '../entity/reservation.entity';
import { ReservationRepository } from '../repository/reservation.repository';
import {
  addMinutes,
  isBefore,
  format,
  parse,
  areIntervalsOverlapping,
} from 'date-fns';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ReservationService {
  constructor(
    private readonly reservationRepository: ReservationRepository,
    private configService: ConfigService,
  ) { }

  async create(
    createReservationDto: CreateReservationRequestDto,
  ): Promise<any> {
    const { date, hour } = createReservationDto;
    const dateToFind = date.split('T')[0];
    const availableTimes = await this.findAllAvailableTimesByDate(dateToFind);
    const isAvailable = availableTimes.some(
      (item: any) => item.startTime === hour,
    );

    if (isAvailable) {
      const duration = this.configService.get<any>(
        'reservation.defaultInterval',
      );
      createReservationDto.duration = duration;
      return this.reservationRepository.create(createReservationDto);
    } else {
      throw new BadRequestException('Reservation is already taken');
    }
  }
  async findAll(
    paginationParams: PaginationParamsDto,
  ): Promise<PaginatedResponseDto<Reservation>> {
    return this.reservationRepository.findAll(paginationParams);
  }

  async findAllAvailableTimesByDate(date: string): Promise<Reservation[]> {
    const intervalMinutesConfig = this.configService.get<any>(
      'reservation.defaultInterval',
    );
    const timesNotAvailable =
      await this.reservationRepository.getReservationsWithoutCanceling(date);
    const buildTimesNotAvailableArray = (reservations) => {
      return reservations
        .map((reservation) => {
          if (reservation.hour !== 'null') {
            const startTime = new Date(
              `${format(reservation.date, 'yyyy-MM-dd')}T${reservation.hour}:00`,
            );
            const endTime = addMinutes(startTime, intervalMinutesConfig - 1);
            return {
              startTime: format(startTime, 'HH:mm'),
              endTime: format(endTime, 'HH:mm'),
            };
          }
        })
        .sort((a, b) => a.startTime.localeCompare(b.startTime));
    };

    const timesNotAvailablefound =
      buildTimesNotAvailableArray(timesNotAvailable);

    const buildCandidateFreeTimes = (startTime, endTime, intervalMinutes) => {
      const candidateFreeTimes = [];
      let currentStartTime = startTime;

      while (isBefore(currentStartTime, endTime)) {
        let currentEndTime = addMinutes(currentStartTime, intervalMinutes - 1);

        if (isBefore(endTime, currentEndTime)) {
          currentEndTime = endTime;
        }

        candidateFreeTimes.push({
          startTime: format(currentStartTime, 'HH:mm'),
          endTime: format(currentEndTime, 'HH:mm'),
        });

        currentStartTime = addMinutes(currentStartTime, intervalMinutes);
      }

      return candidateFreeTimes;
    };

    const startTime = new Date(0, 0, 0, 8, 0);
    const endTime = new Date(0, 0, 0, 18, 0);
    const intervalMinutes = intervalMinutesConfig;

    const candidateFreetimes = buildCandidateFreeTimes(
      startTime,
      endTime,
      intervalMinutes,
    );

    const parseTime = (timeString) => {
      return parse(timeString, 'HH:mm', new Date());
    };

    const filterFreeHours = (candidateFreeHour, ocupados) => {
      return candidateFreeHour.filter((candidate) => {
        const candidateInicio = parseTime(candidate.startTime);
        const candidateFin = parseTime(candidate.endTime);

        return !ocupados.some((ocupado) => {
          const ocupadoInicio = parseTime(ocupado.startTime);
          const ocupadoFin = parseTime(ocupado.endTime);

          return areIntervalsOverlapping(
            { start: candidateInicio, end: candidateFin },
            { start: ocupadoInicio, end: ocupadoFin },
          );
        });
      });
    };

    const availableHours = filterFreeHours(
      candidateFreetimes,
      timesNotAvailablefound,
    );

    return availableHours;
  }

  async findById(reservationId: string): Promise<Reservation> {
    const foundReservation =
      await this.reservationRepository.findById(reservationId);
    if (!foundReservation) {
      throw new NotFoundException(
        `reservation with ID ${reservationId} not found`,
      );
    }
    return foundReservation;
  }
  async update(
    reservationId: string,
    updateReservationDto: UpdateReservationDto,
  ): Promise<Reservation> {
    const foundReservation =
      await this.reservationRepository.findById(reservationId);
    if (!foundReservation) {
      throw new NotFoundException(
        `reservation with ID ${reservationId} not found`,
      );
    }

    return this.reservationRepository.update(
      reservationId,
      updateReservationDto,
    );
  }
}
