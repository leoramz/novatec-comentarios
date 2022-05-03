import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, Max, MaxLength } from "class-validator";

export class CreateComentarioDto {
    @ApiPropertyOptional()
    readonly id?: number;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @MaxLength(32)
    readonly subject: string;

    @ApiProperty()
    @IsString()
    readonly website: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @MaxLength(32)
    readonly text: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @IsEmail()
    @MaxLength(32)
    readonly email: string;
}