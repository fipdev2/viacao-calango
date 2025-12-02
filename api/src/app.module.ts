import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { DriverModule } from './driver/driver.module';
import { CarModule } from './car/car.module';
import { TravelModule } from './travel/travel.module';
import { TicketsModule } from './tickets/tickets.module';

@Module({
  imports: [AuthModule, UsersModule, DatabaseModule,
    ConfigModule.forRoot({
      isGlobal:true
    }),
    DriverModule,
    CarModule,
    TravelModule
    ,
    TicketsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
