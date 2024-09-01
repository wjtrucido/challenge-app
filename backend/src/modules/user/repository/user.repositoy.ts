import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../entity/user.entity';
import { FilterQuery } from 'mongoose';
@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) { }

  async findBy(fields: FilterQuery<User>): Promise<User | null> {
    return this.userModel.findOne(fields).exec();
  }
}
