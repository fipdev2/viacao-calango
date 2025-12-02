import { Body, Controller, Delete, Get, HttpCode, Param, Post } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { CreateTicketDto } from './dtos/create-ticket.dto';

@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @Post()
  async buy(@Body() dto: CreateTicketDto) {
    const ticket = await this.ticketsService.createTicket(dto);
    return ticket;
  }

  @Get()
  async list() {
    return this.ticketsService.listTickets();
  }

  @Delete(':id')
  @HttpCode(204)
  async cancel(@Param('id') id: string) {
    await this.ticketsService.deleteTicket(id);
  }
}
