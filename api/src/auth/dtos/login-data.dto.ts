import { IsEmail, IsNotEmpty } from "class-validator";

export class LoginDataDTO{
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    password: string;
}