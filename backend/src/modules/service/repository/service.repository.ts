import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, FilterQuery } from 'mongoose';
import { PaginatedResponseDto } from '../../../common/dto/paginated-response.dto';
import { PaginationParamsDto } from '../../../common/dto/pagination-params.dto';
import { CreateServiceRequestDto } from '../dto/create-service-request.dto';
import { UpdateServiceDto } from '../dto/update-service.dto';
import { Service } from '../entity/service.entity';

@Injectable()
export class ServiceRepository {
  constructor(
    @InjectModel(Service.name) private serviceModel: Model<Service>,
  ) { }

  async create(createUserDto: CreateServiceRequestDto): Promise<Service> {
    const createdUser = new this.serviceModel(createUserDto);
    return await createdUser.save();
  }

  async findAll({
    page,
    limit,
  }: PaginationParamsDto): Promise<PaginatedResponseDto<Service>> {
    const skip = (page - 1) * limit;
    const totalCount = await this.serviceModel.countDocuments();
    const data = await this.serviceModel.find().skip(skip).limit(limit).exec();
    return {
      totalItems: totalCount,
      currentPage: page,
      pageSize: data.length,
      totalPages: Math.ceil(totalCount / limit),
      data,
    };
  }

  async findById(id: string): Promise<Service> {
    return this.serviceModel.findById(id).exec();
  }

  async findBy(fields: FilterQuery<Service>): Promise<Service> {
    return this.serviceModel.findOne(fields).exec();
  }

  async update(id: string, updateUserDto: UpdateServiceDto): Promise<Service> {
    return this.serviceModel
      .findByIdAndUpdate({ _id: id, active: true }, updateUserDto, {
        new: true,
      })
      .exec();
  }
}
