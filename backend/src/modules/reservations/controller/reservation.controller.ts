import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
  HttpCode,
} from '@nestjs/common';
import { ReservationService } from '../service/reservation.service';
import { PaginatedResponseDto } from '../../../common/dto/paginated-response.dto';
import { PaginationParamsDto } from '../../../common/dto/pagination-params.dto';
import { CreateReservationRequestDto } from '../dto/create-reservation-request.dto';
import { UpdateReservationDto } from '../dto/update-reservation.dto';
import { ReservationResponseDto } from '../dto/reservation-response.dto';
import { ReservationMapper } from '../mapper/reservation.mapper';
import { ValidateObjectId } from '../../../common/pipe/validate-object-id-pipe';

@Controller('reservations')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) { }

  @Post()
  @HttpCode(201)
  async create(
    @Body() createReservationRequestDto: CreateReservationRequestDto,
  ): Promise<ReservationResponseDto> {
    const createdReservation = await this.reservationService.create(
      createReservationRequestDto,
    );
    return ReservationMapper.createReservationResponseDtoFrom(
      createdReservation,
    );
  }

  @Get('available-times')
  async getAvailableTimes(@Query('date') date: string): Promise<any> {
    //const parsedDate = parse(date, 'dd-MM-yyyy', new Date());
    //const isoDate = format(parsedDate, 'yyyy-MM-dd');
    return this.reservationService.findAllAvailableTimesByDate(date);
  }

  @Get()
  async findAll(
    @Query() paginationParams: PaginationParamsDto,
  ): Promise<PaginatedResponseDto<ReservationResponseDto>> {
    const paginatedReservations =
      await this.reservationService.findAll(paginationParams);
    const serviceResponseDtos = paginatedReservations.data.map(
      ReservationMapper.createReservationResponseDtoFrom,
    );
    return {
      ...paginatedReservations,
      data: serviceResponseDtos,
    };
  }

  @Get(':reservationId')
  async findOne(
    @Param('reservationId', ValidateObjectId) serviceId: string,
  ): Promise<ReservationResponseDto> {
    const foundReservation = await this.reservationService.findById(serviceId);
    return ReservationMapper.createReservationResponseDtoFrom(foundReservation);
  }

  @Patch(':reservationId')
  async update(
    @Param('reservationId', ValidateObjectId) reservationId: string,
    @Body() updateReservationDto: UpdateReservationDto,
  ): Promise<ReservationResponseDto> {
    const updatedReservation = await this.reservationService.update(
      reservationId,
      updateReservationDto,
    );
    return ReservationMapper.createReservationResponseDtoFrom(
      updatedReservation,
    );
  }

  @Patch('desactivate/:reservationId')
  async desactivate(
    @Param('reservationId', ValidateObjectId) reservationId: string,
    @Body() updateReservationDto: UpdateReservationDto,
  ) {
    this.reservationService.update(reservationId, updateReservationDto);
    return {
      message: `Se ha desactivado el reservatione con id ${reservationId}`,
    };
  }
}
