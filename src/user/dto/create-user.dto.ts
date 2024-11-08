import { IsDefined, IsString, Length, IsStrongPassword } from "class-validator";
export interface IsStrongPasswordOptions {
    minLength: number;
}
export class CreateUserDTO {
    @IsDefined()
    @IsString()
    @Length(8)
    username: string;

    @IsDefined()
    @IsString()
    @IsStrongPassword()
    passcode: string;
}