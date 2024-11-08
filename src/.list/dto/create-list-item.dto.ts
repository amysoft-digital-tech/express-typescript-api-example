import { IsDefined, IsNumber, IsString, Length } from "class-validator";

export class CreateListItemDTO {
    @IsDefined()
    @IsNumber()
    listId: number;

    @IsDefined()
    @IsNumber()
    itemId: number;

    @IsDefined()
    @IsNumber()
    userId: number;
}