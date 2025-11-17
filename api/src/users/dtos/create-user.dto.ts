// src/users/dto/create-user.dto.ts
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class CreateUserDto {
    @IsEmail({}, { message: 'Invalid email format' })
    @IsNotEmpty({ message: 'Missing required field: email' })
    email: string;

    @IsNotEmpty({ message: 'Missing required field: name' })
    @MinLength(2, { message: 'Name must be at least 2 characters long' })
    name: string;

    @IsNotEmpty({ message: 'Missing required field: password' })
    @MinLength(6, { message: 'Password must be at least 6 characters long' })
    password: string;
}