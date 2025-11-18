import { IsDate, IsNotEmpty, IsString, IsUUID } from "class-validator";

export class UpdateTravelDTO {
    @IsUUID()
    @IsNotEmpty()
    id: string;
    
    @IsString()
    origin: string;

    @IsString()
    destination: string;

    @IsDate()
    departure: Date;

    @IsDate()
    arrival: Date;

    @IsUUID()
    carId: string;
}