import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsString } from "class-validator";

export class ResponseDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsBoolean()
    error: boolean;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    msg: string;

    @ApiProperty()
    @IsNotEmpty()
    data: Object;
}