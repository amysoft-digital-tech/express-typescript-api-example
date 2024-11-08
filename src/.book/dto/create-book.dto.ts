import { IsDefined, IsNumber, IsString, Length } from "class-validator";

export class CreateBookDTO {
    @IsDefined()
    @IsString()
    @Length(2)
    title: string;

    @IsNumber()
    author: number;

    @IsString()
    cover_image: string;
}