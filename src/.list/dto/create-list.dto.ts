import { IsDefined, IsInt, IsString, Length } from "class-validator";

export class CreateListDTO {
    @IsDefined()
    @IsString()
    @Length(2)
    name: string;

    @IsDefined()
    @IsInt()
    collectionId: number;
}