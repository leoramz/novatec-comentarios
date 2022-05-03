import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class RegisterUserDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @MinLength(4)
    @MaxLength(32)
    username: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    @MaxLength(32)
    password: string;
}