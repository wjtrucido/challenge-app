import { Module } from '@nestjs/common';
import { ServiceService } from './service/service.service';
import { ServiceController } from './controller/user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Service, ServiceSchema } from './entity/service.entity';
import { ServiceRepository } from './repository/service.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Service.name, schema: ServiceSchema }]),
  ],
  controllers: [ServiceController],
  providers: [ServiceService, ServiceRepository],
  exports: [ServiceService, MongooseModule],
})
export class ServiceModule { }
