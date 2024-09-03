import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './modules/user/user.module';
import { RoleModule } from './modules/role/role.module';
import { ServiceModule } from './modules/service/service.module';
import { SeederService } from './seeders/seeder.service';
import { ClientModule } from './modules/client/client.module';

@Module({
  imports: [
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
  ],
  controllers: [AppController],
  providers: [AppService, SeederService],
})
export class AppModule { }
