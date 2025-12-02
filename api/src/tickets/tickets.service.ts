import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateTicketDto } from './dtos/create-ticket.dto';

@Injectable()
export class TicketsService {
  constructor(private readonly database: DatabaseService) {}

  async createTicket(createDto: CreateTicketDto) {
    const travel = await this.database.travel.findUnique({
      where: { id: createDto.travelId },
      include: { car: true, tickets: true },
    });

    if (!travel) {
      throw new HttpException('Travel not found', HttpStatus.NOT_FOUND);
    }

    const car = travel.car;
    if (!car) {
      throw new HttpException('Car for travel not found', HttpStatus.BAD_REQUEST);
    }

    const purchased = await this.database.ticket.count({ where: { travelId: travel.id } });

    if (purchased >= car.numberOfSeats) {
      throw new HttpException('No seats available', HttpStatus.BAD_REQUEST);
    }

    const seatNo = purchased + 1;

    const ticket = await this.database.ticket.create({
      data: {
        travelId: travel.id,
        userId: createDto.userId ?? '',
        seatNo,
      },
    });

    return ticket;
  }

  async listTickets() {
    return this.database.ticket.findMany({ include: { travel: true, user: true } });
  }

  async deleteTicket(ticketId: string) {
    // A delete frees a seat implicitly
    return this.database.ticket.delete({ where: { id: ticketId } });
  }
}
