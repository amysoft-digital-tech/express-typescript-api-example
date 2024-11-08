import { IsNumber, IsString, Length } from "class-validator";

export class CreatePageDTO {
    @IsNumber()
    publicationId: number;
    
    @IsNumber()
    sectionId: number;

    @IsNumber()
    subsectionId: number;

    @IsString()
    name: string;

    @IsString()
    content: string;
}