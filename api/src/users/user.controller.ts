import { Controller, Post, Request, Response, Body, HttpException, HttpStatus } from "@nestjs/common";
import { UsersService } from "./users.service";
import { Role } from "generated/prisma/client";
import { CreateUserDto } from "./dtos/create-user.dto";

@Controller('users')
export class UserController {
    constructor(private readonly usersService: UsersService) { }
    @Post('create')
    async createUser(@Body() userData: CreateUserDto) {
        const { email, name, password } = userData;

        const createUserSchema = {
            email: email,
            name: name,
            role: Role.USER
        };

        const response = await this.usersService.createUser(createUserSchema, password);

        if (!response) {
            throw new HttpException('Error creating user', HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return { message: 'User created successfully' };
    }
}