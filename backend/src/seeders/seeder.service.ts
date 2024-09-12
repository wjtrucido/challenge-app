import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../modules/user/entity/user.entity';
import { Role } from 'src/modules/role/entity/role.entity';
import { client } from 'src/modules/client/entity/client.entity';
import { Service } from 'src/modules/service/entity/service.entity';
import { Reservation } from 'src/modules/reservations/entity/reservation.entity';
import { SEED_RESERVATIONS } from '../common/constant/seed-reservations.constant';
import { SEED_USERS } from '../common/constant/seed-users.constant';
import { SEED_ROLES } from '../common/constant/seed-roles.constant';
import { SEED_SERVICES } from '../common/constant/seed-services.constant';
import { SEED_CLIENTS } from '../common/constant/seed-clients.constant';

@Injectable()
export class SeederService implements OnModuleInit {
  constructor(
    @InjectModel(Role.name) private roleModel: Model<Role>,
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Service.name) private serviceModel: Model<Service>,
    @InjectModel(client.name) private clientModel: Model<client>,
    @InjectModel(Reservation.name) private reservationModel: Model<Reservation>,
  ) { }

  async onModuleInit(): Promise<void> {
    await this.seedRoles();
    await this.seedUsers();
    await this.seedServices();
    await this.seedClients();
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

  async seedClients() {
    const count = await this.clientModel.countDocuments().exec();
    if (count !== 0) {
      return;
    }

    await this.clientModel.insertMany(SEED_CLIENTS);
  }

  async seedReservations() {
    const count = await this.reservationModel.countDocuments().exec();
    if (count !== 0) {
      return;
    }

    await this.reservationModel.insertMany(SEED_RESERVATIONS);
  }
}
