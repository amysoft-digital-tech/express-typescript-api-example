import { IsDefined, IsNumber, IsString, Length } from "class-validator";

export class CreateItemTypeDTO {
    @IsDefined()
    @IsString()
    @Length(2)
    name: string;

    @IsDefined()
    @IsNumber()
    userId: number;
}