import { IsDate, IsNotEmpty, IsString, IsUUID } from "class-validator";

export class CreateTravelDto {
    @IsNotEmpty()
    @IsString()
    origin: string;

    @IsNotEmpty()
    @IsString()
    destination: string;
    
    @IsDate()
    @IsNotEmpty()
    departure: Date;
    
    @IsDate()
    @IsNotEmpty()
    arrival: Date;

    @IsUUID()
    @IsNotEmpty()
    carId: string;
}
