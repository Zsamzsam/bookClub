import { IsDate, IsDateString, IsIn, IsString } from "class-validator"

export class CreateApiDto {
    @IsString()
    name: string
    @IsIn(["M", "F", undefined])
    gender?: string
    @IsDateString()
    birth_date: Date 
}
