import { Role } from "generated/prisma/client";

export class CleanUserDTO {
    id: string;
    email: string;
    name: string;
    role: Role;
}