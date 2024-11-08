import { IsDefined, IsNumber, IsString, Length } from "class-validator";

export class CreatePublicationDTO {
    @IsDefined()
    @IsString()
    @Length(2)
    name: string;

    @IsDefined()
    @IsString()
    @Length(2)
    title: string;
}