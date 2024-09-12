import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, FilterQuery } from 'mongoose';
import { PaginatedResponseDto } from '../../../common/dto/paginated-response.dto';
import { PaginationParamsDto } from '../../../common/dto/pagination-params.dto';
import { CreateClientRequestDto } from '../dto/create-client-request.dto';
import { UpdateClientDto } from '../dto/update-client.dto';
import { client } from '../entity/client.entity';

@Injectable()
export class ClientRepository {
  constructor(@InjectModel(client.name) private clientModel: Model<client>) { }

  async create(createUserDto: CreateClientRequestDto): Promise<client> {
    const createdUser = new this.clientModel(createUserDto);
    return await createdUser.save();
  }

  async findAll({
    page,
    limit,
  }: PaginationParamsDto): Promise<PaginatedResponseDto<client>> {
    const skip = (page - 1) * limit;
    const totalCount = await this.clientModel.countDocuments();
    const data = await this.clientModel
      .find({ active: true })
      .skip(skip)
      .limit(limit)
      .exec();
    return {
      totalItems: totalCount,
      currentPage: page,
      pageSize: data.length,
      totalPages: Math.ceil(totalCount / limit),
      data,
    };
  }

  async findById(id: string): Promise<client> {
    return this.clientModel.findOne({ _id: id, active: true }).exec();
  }

  async findBy(fields: FilterQuery<client>): Promise<client> {
    return this.clientModel.findOne({ ...fields, active: true }).exec();
  }

  async update(id: string, updateUserDto: UpdateClientDto): Promise<client> {
    return this.clientModel
      .findOneAndUpdate({ _id: id }, updateUserDto, {
        new: true,
      })
      .exec();
  }
}
