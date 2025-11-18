import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { Prisma, Role, User } from 'generated/prisma/client';
import { DatabaseService } from 'src/database/database.service';
import { UserDTO } from './user.dto';
import * as bcrypt from 'bcrypt';




@Injectable()
export class UsersService {

    constructor(private readonly databaseService: DatabaseService) { }

    async findUserByEmail(email: string): Promise<UserDTO | null> {
        const user = await this.databaseService.user.findUnique({
            where: {
                email: email
            },
            include: { userPassword: true }
        });

        const userDTO = user ? {
            id: user.id,
            email: user.email,
            name: user.name || '',
            role: user.role,
            userPassword: {
                salt: user.userPassword!.salt,
                hashedPassword: user.userPassword!.password
            }
        } : null;

        return userDTO;
    }

    async createUser(UserCreateInput: Prisma.UserCreateInput, password: string): Promise<User | null> {

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await this.databaseService.user.create({
            data: {
                ...UserCreateInput,
                userPassword: {
                    create: {
                        salt,
                        password: hashedPassword
                    }
                }
            },
            include: {
                userPassword: true
            }
        });

        return newUser;
    }

    async getUsers(): Promise<User[] | []> {
        return this.databaseService.user.findMany({
            where: {
                role: Role.USER
            }
        });
    }
}
