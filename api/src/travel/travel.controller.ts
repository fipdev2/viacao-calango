import { Controller, Post, Body, UseGuards, Get, HttpException, HttpStatus, UsePipes, ValidationPipe } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { CreateTravelDto } from './dtos/create-travel.dto';
import { DeleteTravelDto } from './dtos/delete-travel.dto';
import { UpdateTravelDTO } from './dtos/update-travel.dto';
import { TravelService } from './travel.service';

@Controller('travel')
export class TravelController {
  constructor(private readonly travelService: TravelService) {}

  @Roles('EMPLOYEE')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('create')
  @UsePipes(new ValidationPipe({ transform: true }))
  async createTravel(@Body() createTravelDto: CreateTravelDto) {
    const response = await this.travelService.createTravel(createTravelDto);
    if (!response) {
      throw new HttpException('Error creating travel', HttpStatus.INTERNAL_SERVER_ERROR);
    }
    return { message: 'Travel created successfully' };
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('EMPLOYEE')
  @Post('list')
  async listTravels() {
    const response = await this.travelService.listTravels();
    if (!response) {
      throw new HttpException('Error fetching travels', HttpStatus.INTERNAL_SERVER_ERROR);
    }
    return response;
  }

  @Roles('EMPLOYEE')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('delete')
  @UsePipes(new ValidationPipe({ transform: true }))
  async deleteTravel(@Body() deleteTravelDto: DeleteTravelDto) {
    const response = await this.travelService.deleteTravel(deleteTravelDto.travelId);
    if (!response) {
      throw new HttpException('Error deleting travel', HttpStatus.INTERNAL_SERVER_ERROR);
    }
    return { message: 'Travel deleted successfully' };
  }

  @Roles('EMPLOYEE')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('update')
  async updateTravel(@Body() updateTravelDto: UpdateTravelDTO) {
    const response = await this.travelService.updateTravel(updateTravelDto);
    if (!response) {
      throw new HttpException('Error updating travel', HttpStatus.INTERNAL_SERVER_ERROR);
    }
    return { message: 'Travel updated successfully' };
  }
}
