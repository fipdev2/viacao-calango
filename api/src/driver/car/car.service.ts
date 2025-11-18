import { Prisma } from "generated/prisma/client";
import { DatabaseService } from "src/database/database.service";

export class CarService {
    constructor(private readonly databaseService: DatabaseService) { }

    async createCar(carData: Prisma.CarCreateInput) {
        const newCar = await this.databaseService.car.create({
            data: {
                ...carData
            }
        });

        if (!newCar) {
            return null;
        }
        return newCar;
    }

    async getAllCars() {
        const cars = await this.databaseService.car.findMany();
        return cars;
    }

    async updateCar(updateData: Prisma.CarUpdateInput) {
        const updatedCar = await this.databaseService.car.update({
            where: {
                id: updateData.id as string,
            },
            data: {
                ...updateData
            }
        });
        if (!updatedCar) {
            return null;
        }
        return updatedCar;
    }

    async deleteCar(carId: string) {
        const deletedCar = await this.databaseService.car.delete({
            where: {
                id: carId
            }
        });
        if (!deletedCar) {
            return null;
        }
        return deletedCar;
    }