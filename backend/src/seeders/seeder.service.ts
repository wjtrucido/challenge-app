import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../modules/user/entity/user.entity';
import { Role } from 'src/modules/role/entity/role.entity';
import { SEED_USERS } from '../common/constant/seed-users.constant';
import { SEED_ROLES } from '../common/constant/seed-roles.constant';
@Injectable()
export class SeederService implements OnModuleInit {
  constructor(
    @InjectModel(Role.name) private roleModel: Model<Role>,
    @InjectModel(User.name) private userModel: Model<User>,
  ) { }

  async onModuleInit(): Promise<void> {
    await this.seedRoles();
    await this.seedUsers();
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
}
