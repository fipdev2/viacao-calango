import { IsUUID } from 'class-validator';

export class DeleteTicketDto {
  @IsUUID()
  ticketId: string;
}
