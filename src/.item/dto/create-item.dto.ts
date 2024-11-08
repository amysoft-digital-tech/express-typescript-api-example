import { IsDefined, IsNumber, IsString, Length } from "class-validator";

export class CreateItemDTO {
    @IsDefined()
    @IsString()
    @Length(2)
    name: string;

    @IsDefined()
    @IsNumber()
    typeId: number;

    @IsDefined()
    @IsNumber()
    userId: number;
}