import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserController } from './user.controller';
import { EmployeeController } from './employee/employee.controller';
import { TravelService } from './travel/travel.service';

@Module({
  controllers: [UserController, EmployeeController],
  providers: [UsersService, TravelService],
  exports: [UsersService],
})
export class UsersModule { }
