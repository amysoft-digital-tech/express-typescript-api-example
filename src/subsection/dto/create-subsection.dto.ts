import { IsDefined, IsNumber, IsString, Length } from "class-validator";

export class CreateSubsectionDTO {
    @IsDefined()
    @IsString()
    name: string;

    @IsDefined()
    @IsNumber()
    sectionId: number;

    @IsDefined()
    @IsNumber()
    publicationId: number;
}