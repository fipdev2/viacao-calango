import { HttpException, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { CleanUserDTO } from './dtos/clean-user.dto';


@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) { }

    async validateUser(email: string, pass: string): Promise<CleanUserDTO | null> {
        const user = await this.usersService.findUserByEmail(email);
        const isPasswordValid = user ? await bcrypt.compare(pass, user.userPassword.hashedPassword) : false;

        if (user && isPasswordValid) {
            const { userPassword, ...cleanUser } = user;
            return cleanUser;
        }
        return null;
    }

    async login(email: string, password: string) {
        const validatedUser = await this.validateUser(email, password);

        if (!validatedUser) {
            throw new HttpException("Invalid credentials", 401);
        }

        const playload = { email: email, sub: validatedUser!.id, role: validatedUser!.role };
        const access_token = this.jwtService.sign(playload);
        return {
            access_token
        };
    }
}
