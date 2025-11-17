import { Role } from 'generated/prisma/client';

export type UserDTO = {
    id: string;
    email: string;
    name: string;
    role: Role;
    userPassword: {
        salt: string;
        hashedPassword: string;
    }
}