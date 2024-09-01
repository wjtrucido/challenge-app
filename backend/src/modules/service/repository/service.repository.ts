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
  constructor(@InjectModel(Service.name) private userModel: Model<Service>) { }

  async create(createUserDto: CreateServiceRequestDto): Promise<Service> {
    const createdUser = new this.userModel(createUserDto);
    return await createdUser.save();
  }

  async findAll({
    page,
    limit,
  }: PaginationParamsDto): Promise<PaginatedResponseDto<Service>> {
    const skip = (page - 1) * limit;
    const totalCount = await this.userModel.countDocuments();
    const data = await this.userModel.find().skip(skip).limit(limit).exec();
    return {
      totalItems: totalCount,
      currentPage: page,
      pageSize: data.length,
      totalPages: Math.ceil(totalCount / limit),
      data,
    };
  }

  async findById(id: string): Promise<Service> {
    return this.userModel.findById(id).exec();
  }

  async findBy(fields: FilterQuery<Service>): Promise<Service> {
    return this.userModel.findOne(fields).exec();
  }

  async update(id: string, updateUserDto: UpdateServiceDto): Promise<Service> {
    return this.userModel
      .findByIdAndUpdate(id, updateUserDto, { new: true })
      .exec();
  }

  async remove(id: string): Promise<void> {
    await this.userModel.deleteOne({ _id: id }).exec();
  }
}
