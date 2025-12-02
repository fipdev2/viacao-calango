import { IsEmail, IsEnum, IsNotEmpty, IsString } from "class-validator";
import { Role } from "generated/prisma/enums";

export class CreateDriverDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;
    
    @IsString()
    @IsNotEmpty()
    name: string;
    
    @IsEnum([Role.DRIVER])
    @IsNotEmpty()
    role: Role;


    @IsString()
    @IsNotEmpty()
    password: string;
}