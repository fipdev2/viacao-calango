import { IsUUID } from "class-validator";

export class DriverIdDto {
    @IsUUID()
    id: string;
}