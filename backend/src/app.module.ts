import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './modules/user/user.module';
import { RoleModule } from './modules/role/role.module';
import { ServiceModule } from './modules/service/service.module';
import { SeederService } from './seeders/seeder.service';
import { ClientModule } from './modules/client/client.module';
import { ReservationModule } from './modules/reservations/reservation.module';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri:
          process.env.MONGO_URI ||
          'mongodb://root:password@localhost:27017/challengeDB?authSource=admin',
      }),
    }),
    UserModule,
    RoleModule,
    ServiceModule,
    ClientModule,
    ReservationModule,
  ],
  controllers: [AppController],
  providers: [AppService, SeederService],
})
export class AppModule { }
