import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { Role } from 'generated/prisma/client';
import * as bcrypt from 'bcrypt';
import { CreateDriverDto } from './dtos/create-driver.dto';
import { Prisma } from 'generated/prisma/browser';
@Injectable()
export class DriverService {

    constructor(private readonly databaseService: DatabaseService) { }

    async getAllDrivers() {
        const drivers = await this.databaseService.user.findMany({
            where: {
                role: Role.DRIVER
            }
        });
        return drivers;
    }

    async getDriverById(driverId: string) {
        const driver = await this.databaseService.user.findUnique({
            where: {
                id: driverId,
                role: Role.DRIVER
            }
        });
        return driver;
    }

    async createDriver(driverData: CreateDriverDto) {

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(driverData.password, salt);
        const newDriver = await this.databaseService.user.create({
            data: {
                email: driverData.email,
                name: driverData.name,
                role: Role.DRIVER,
                userPassword: {
                    create: {
                        salt,
                        password: hashedPassword
                    }
                }
            },
            include: {
                userPassword: true
            }
        });

        if (!newDriver) {
            return null;
        }
        return newDriver;
    }

    async updateDriver(updateData: Prisma.UserUpdateInput) {
        const updatedDriver = await this.databaseService.user.update({
            where: {
                id: updateData.id as string,
                role: Role.DRIVER
            },
            data: {
                ...updateData
            }
        });
        return updatedDriver;
    }

    async deleteDriver(driverId: string) {
        const deletedDriver = await this.databaseService.user.delete({
            where: {
                id: driverId,
                role: Role.DRIVER
            }
        });

        if (!deletedDriver) {
            return null;
        }
        return deletedDriver;
    }


}