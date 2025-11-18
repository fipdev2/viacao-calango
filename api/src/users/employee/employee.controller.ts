import { Controller, Get, UseGuards, Request, Post, Body, HttpException, HttpStatus, UsePipes, ValidationPipe } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { UsersService } from "../users.service";
import { RolesGuard } from "src/auth/roles.guard";
import { Role } from "generated/prisma/client";
import { Roles } from "src/auth/roles.decorator";
import { CreateTravelDto } from "../travel/dtos/create-travel.dto";
import { TravelService } from "../travel/travel.service";
import { DeleteTravelDto } from "../travel/dtos/delete-travel.dto";
import { UpdateTravelDTO } from "../travel/dtos/update-travel.dto";

@Controller('employee')
export class EmployeeController {
    constructor(
        private readonly usersService: UsersService,
        private readonly travelService: TravelService
    ) { }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles("EMPLOYEE")
    @Get('listUsers')
    async getUsers(@Request() req) {
        const response = await this.usersService.getUsers();

        if (!response) {
            throw new HttpException("Error fetching users", HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return response;
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles("EMPLOYEE")
    @Post('createTravel')
    @UsePipes(new ValidationPipe({ transform: true }))
    async createTravel(@Body() createTravelDto: CreateTravelDto) {
        const response = await this.travelService.createTravel(createTravelDto);

        if (!response) {
            throw new HttpException("Error creating travel", HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return { message: 'Travel created successfully' };
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles("EMPLOYEE")
    @Post('listTravels')
    async listTravels() {
        const response = await this.travelService.listTravels();

        if (!response) {
            throw new HttpException("Error fetching travels", HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return response;
    }
    
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles("EMPLOYEE")
    @Post('deleteTravel')
    async deleteTravel(@Body() deleteTravelDto: DeleteTravelDto) {

        const response = await this.travelService.deleteTravel(deleteTravelDto.travelId);

        if (!response) {
            throw new HttpException("Error deleting travel", HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return { message: 'Travel deleted successfully' };
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles("EMPLOYEE")
    @Post('updateTravel')
    async updateTravel(@Body() updateTravelDto: Partial<UpdateTravelDTO>) {
        const response = await this.travelService.updateTravel(updateTravelDto);

        if (!response) {
            throw new HttpException("Error updating travel", HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return { message: 'Travel updated successfully' };
    }
    
}