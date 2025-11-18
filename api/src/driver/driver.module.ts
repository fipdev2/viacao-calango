import { Module } from '@nestjs/common';
import { DriverController } from './driver.controller';
import { DriverService } from './driver.service';
import { CarService } from './car/car.service';

@Module({
  controllers: [DriverController],
  providers: [DriverService, CarService],
})
export class DriverModule {}
