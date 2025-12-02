import { IsNotEmpty, IsUUID } from 'class-validator';

export class CreateTicketDto {
  @IsUUID()
  @IsNotEmpty()
  travelId: string;

  // Optionally allow specifying a userId (admin flows).
  // For authenticated flows you can derive userId from the request.
  @IsUUID()
  userId?: string;
}
