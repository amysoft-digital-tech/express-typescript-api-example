import { IsDefined, IsNumber, IsString, Length } from "class-validator";

export class CreateSectionDTO {
    @IsDefined()
    @IsString()
    @Length(3)
    name: string;

    @IsDefined()
    @IsNumber()
    publicationId: number;
}