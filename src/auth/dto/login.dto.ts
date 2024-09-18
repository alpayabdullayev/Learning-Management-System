import { ApiProperty,  } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class LoginDto {
    @ApiProperty({ default: "alpayabdullayev0@gmail.com" })
    @IsNotEmpty()
    @IsEmail()
    email: string

    @ApiProperty({ default: "alpay1937" })
    @IsNotEmpty()
    @IsString()
    password: string
}