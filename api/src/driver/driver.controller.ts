import { Body, Controller, HttpException, UseGuards } from '@nestjs/common';
import { CarService } from './car/car.service';
import { DriverService } from './driver.service';
import { Role } from 'generated/prisma/client';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { DriverIdDto } from './dtos/driver-id.dto';
import { CreateDriverDto } from './dtos/create-driver.dto';
@Controller('driver')
export class DriverController {
    constructor(
        private readonly driverService: DriverService,
        private readonly carService: CarService
    ) { }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.DRIVER, Role.EMPLOYEE)
    async getAllDrivers() {
        const response = await this.driverService.getAllDrivers();

        return response;
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.DRIVER, Role.EMPLOYEE)
    async getDriverById(@Body() driverDTO: DriverIdDto) {
        const response = await this.driverService.getDriverById(driverDTO.id);
        if (!response) {
            throw new HttpException("Driver not found", 404);
        }
        return response;
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.EMPLOYEE)
    async createDriver(@Body() createDriverDto: CreateDriverDto) {
        const response = await this.driverService.createDriver(createDriverDto);
        if (!response) {
            throw new HttpException("Error creating driver", 500);
        }
        return response;
    }

    async deleteDriver(@Body() driverDTO: DriverIdDto) {
        const response = await this.driverService.deleteDriver(driverDTO.id);
        if (!response) {
            throw new HttpException("Error deleting driver", 500);
        }
        return response;
    }
}