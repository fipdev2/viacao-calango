import { Controller, Post, Body, HttpException, HttpStatus, UseGuards, Get } from '@nestjs/common';
import { CarService } from './car.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'generated/prisma/client';

@Controller('car')
export class CarController {
  constructor(private readonly carService: CarService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.EMPLOYEE, Role.DRIVER)
  @Get('list')
  async listCars() {
    return this.carService.getAllCars();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.EMPLOYEE)
  @Post('create')
  async createCar(@Body() data: any) {
    const response = await this.carService.createCar(data);
    if (!response) throw new HttpException('Error creating car', HttpStatus.INTERNAL_SERVER_ERROR);
    return response;
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.EMPLOYEE)
  @Post('update')
  async updateCar(@Body() data: any) {
    const response = await this.carService.updateCar(data);
    if (!response) throw new HttpException('Error updating car', HttpStatus.INTERNAL_SERVER_ERROR);
    return response;
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.EMPLOYEE)
  @Post('delete')
  async deleteCar(@Body('id') id: string) {
    const response = await this.carService.deleteCar(id);
    if (!response) throw new HttpException('Error deleting car', HttpStatus.INTERNAL_SERVER_ERROR);
    return response;
  }
}
