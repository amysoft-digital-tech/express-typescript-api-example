import { IsDefined, IsNumber, IsString, Length } from "class-validator";

export class CreateObjectDTO {
    @IsDefined()
    @IsString()
    @Length(2)
    name: string;
}