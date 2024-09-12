import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, FilterQuery } from 'mongoose';
import { PaginatedResponseDto } from '../../../common/dto/paginated-response.dto';
import { PaginationParamsDto } from '../../../common/dto/pagination-params.dto';
import { CreateReservationRequestDto } from '../dto/create-reservation-request.dto';
import { UpdateReservationDto } from '../dto/update-reservation.dto';
import { Reservation } from '../entity/reservation.entity';

@Injectable()
export class ReservationRepository {
  constructor(
    @InjectModel(Reservation.name) private reservationModel: Model<Reservation>,
  ) { }

  async create(
    createUserDto: CreateReservationRequestDto,
  ): Promise<Reservation> {
    const createdUser = new this.reservationModel(createUserDto);
    return await createdUser.save();
  }

  async findAll({
    page,
    limit,
  }: PaginationParamsDto): Promise<PaginatedResponseDto<Reservation>> {
    const skip = (page - 1) * limit;
    const totalCount = await this.reservationModel.countDocuments({
      active: true,
    });
    const data = await this.reservationModel
      .find({
        active: true,
        canceled: false,
      })
      .skip(skip)
      .limit(limit)
      .populate('clientId') // Popula la referencia del cliente
      .populate('serviceId')
      .exec();
    return {
      totalItems: totalCount,
      currentPage: page,
      pageSize: data.length,
      totalPages: Math.ceil(totalCount / limit),
      data,
    };
  }

  async getReservationsWithoutCanceling(date: string): Promise<Reservation[]> {
    const startOfDay = date.split('T')[0] + 'T00:00:00.000Z';
    const endOfDay = date.split('T')[0] + 'T23:59:59.999Z';

    const data = this.reservationModel.find({
      date: {
        $gte: startOfDay,
        $lte: endOfDay,
      },
      active: true,
      canceled: false,
    });
    return data;
  }

  async findById(id: string): Promise<Reservation> {
    return this.reservationModel.findOne({ _id: id, active: true }).exec();
  }

  async findBy(fields: FilterQuery<Reservation>): Promise<Reservation> {
    return this.reservationModel.findOne({ ...fields, active: true }).exec();
  }

  async update(
    id: string,
    updateUserDto: UpdateReservationDto,
  ): Promise<Reservation> {
    return this.reservationModel
      .findOneAndUpdate({ _id: id }, updateUserDto, {
        new: true,
      })
      .exec();
  }
}
