import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Prisma } from "generated/prisma/client";
import { DatabaseService } from "src/database/database.service";
import { CreateTravelDto } from "./dtos/create-travel.dto";
import { response } from "express";

@Injectable()
export class TravelService {
    constructor(private readonly databaseService: DatabaseService) { }

    async createTravel(createTravelDto: CreateTravelDto) {
        const travel = await this.databaseService.travel.create({
            data: { 
                destination: createTravelDto.destination,
                arrival: createTravelDto.arrival,
                departure: createTravelDto.departure,
                origin: createTravelDto.origin,
                carId: createTravelDto.carId,
             }
        });

        return travel;
    }
    
    async listTravels() {
        const travels = await this.databaseService.travel.findMany();

        return travels;
    }

    async deleteTravel(travelId: string) {
        const deletedTravel = await this.databaseService.travel.delete({
            where: {
                id: travelId
            }
        });

        return deletedTravel;
    }

    async updateTravel(updateTravelDto: Prisma.TravelUpdateInput) {
        const updatedTravel = await this.databaseService.travel.update({
            where: {
                id: updateTravelDto.id as string
            },
            data: { ...updateTravelDto }
        });

        return updatedTravel;
    }
}