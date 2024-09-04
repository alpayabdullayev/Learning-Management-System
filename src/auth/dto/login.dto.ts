import { ApiProperty,  } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class LoginDto {
    @ApiProperty({ default: "alpay@mail.ru" })
    @IsNotEmpty()
    @IsEmail()
    email: string

    @ApiProperty({ default: "alpay123" })
    @IsNotEmpty()
    @IsString()
    password: string
}