import { IsEmail, IsNotEmpty, IsString, IsUUID } from "class-validator";

export class UpdateDriverDto {
    @IsUUID()
    @IsNotEmpty()
    id: string;

    @IsString()
    name: string;
    
    @IsEmail()
    email: string;
}