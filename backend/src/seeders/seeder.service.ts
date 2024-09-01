import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../modules/user/entity/user.entity';
import { Role } from 'src/modules/role/entity/role.entity';
import { Service } from 'src/modules/service/entity/service.entity';
import { SEED_USERS } from '../common/constant/seed-users.constant';
import { SEED_ROLES } from '../common/constant/seed-roles.constant';
import { SEED_SERVICES } from '../common/constant/seed-services.constant';
@Injectable()
export class SeederService implements OnModuleInit {
  constructor(
    @InjectModel(Role.name) private roleModel: Model<Role>,
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Service.name) private serviceModel: Model<Service>,
  ) { }

  async onModuleInit(): Promise<void> {
    await this.seedRoles();
    await this.seedUsers();
    await this.seedServices();
  }

  async seedRoles() {
    const count = await this.roleModel.countDocuments().exec();
    if (count !== 0) {
      return;
    }

    await this.roleModel.insertMany(SEED_ROLES);
  }

  async seedUsers() {
    const count = await this.userModel.countDocuments().exec();
    if (count !== 0) {
      return;
    }

    await this.userModel.insertMany(SEED_USERS);
  }

  async seedServices() {
    const count = await this.serviceModel.countDocuments().exec();
    if (count !== 0) {
      return;
    }

    await this.serviceModel.insertMany(SEED_SERVICES);
  }
}
