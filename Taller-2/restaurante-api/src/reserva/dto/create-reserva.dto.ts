import { IsNumber, IsDateString } from 'class-validator';

export class CreateReservaDto {
    @IsNumber()
    clienteId: number;

    @IsNumber()
    platoId: number;

    @IsDateString()
    fecha: string;
}