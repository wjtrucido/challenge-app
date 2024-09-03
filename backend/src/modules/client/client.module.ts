import { Module } from '@nestjs/common';
import { ClientService } from './service/client.service';
import { ClientController } from './controller/client.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { client, ServiceSchema } from './entity/client.entity';
import { ClientRepository } from './repository/client.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: client.name, schema: ServiceSchema }]),
  ],
  controllers: [ClientController],
  providers: [ClientService, ClientRepository],
  exports: [ClientService, MongooseModule],
})
export class ClientModule { }
