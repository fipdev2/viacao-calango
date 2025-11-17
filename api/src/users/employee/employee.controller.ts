import { Controller, Get, UseGuards, Request } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { UsersService } from "../users.service";
import { RolesGuard } from "src/auth/roles.guard";
import { Role } from "generated/prisma/client";
import { Roles } from "src/auth/roles.decorator";

@Controller('employee')
export class EmployeeController {
    constructor(private readonly usersService: UsersService) { }
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(
        "EMPLOYEE"
    )
    @Get('listUsers')
    async getUsers(@Request() req) {
        return this.usersService.getUsers();
    }
}