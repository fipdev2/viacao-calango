import { Controller, Request, Post, UseGuards, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LoginDataDTO } from './dtos/login-data.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('login')
    async login(@Body() loginData: LoginDataDTO): Promise<{ access_token: string; } | null> {
        const { email, password } = loginData;
        return this.authService.login(email, password);
    }

    @UseGuards(JwtAuthGuard)
    @Post('logout')
    @HttpCode(HttpStatus.OK)
    async logout(@Request() req) {
        req.logout();
        return { message: 'Logged out successfully' };
    }
}
