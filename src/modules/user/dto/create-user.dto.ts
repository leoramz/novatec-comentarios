import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNotEmpty, IsString, Max, Min } from "class-validator";

export class CreateUserDto {
    @ApiPropertyOptional()
    readonly id?: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    readonly username: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    readonly password: string;
}