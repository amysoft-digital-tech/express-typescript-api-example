import { IsDefined, IsString, IsNumber, Length } from "class-validator";

export class UpdateCollectionNameDTO {
    @IsDefined()
    @IsNumber()
    id: number;
    
    @IsDefined()
    @IsString()
    @Length(2)
    name: string;

    @IsNumber()
    userId: number;
}