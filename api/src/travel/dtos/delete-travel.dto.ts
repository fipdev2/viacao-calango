import { IsUUID } from 'class-validator';

export class DeleteTravelDto {
  @IsUUID()
  travelId: string;
}
