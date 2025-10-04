import { IsString, IsNumber, Min } from 'class-validator';

export class CreatePlatoDto {
    @IsString()
    nombre: string;

    @IsNumber()
    @Min(1)
    precio: number;
}