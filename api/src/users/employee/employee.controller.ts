import { Controller, Get, UseGuards, Request, HttpException, HttpStatus } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { UsersService } from "../users.service";
import { RolesGuard } from "src/auth/roles.guard";
import { Roles } from "src/auth/roles.decorator";

@Controller('employee')
export class EmployeeController {
    constructor(
        private readonly usersService: UsersService,
    ) { }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles("EMPLOYEE")
    @Get('listUsers')
    async getUsers(@Request() req) {
        const response = await this.usersService.getUsers();

        if (!response) {
            throw new HttpException("Error fetching users", HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return response;
    }

    // Travel-related endpoints moved to dedicated Travel module/controller
}