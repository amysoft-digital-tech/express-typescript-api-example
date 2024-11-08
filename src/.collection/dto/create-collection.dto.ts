import { IsDefined, IsString, IsNumber, Length } from "class-validator";
export enum CollectionType {
    LIST = "1",    
}
export class CreateCollectionDTO {
    @IsDefined()
    @IsString()
    @Length(2)
    name: string;

    @IsDefined()
    @IsNumber()
    type: CollectionType;

    @IsNumber()
    userId: number;
}