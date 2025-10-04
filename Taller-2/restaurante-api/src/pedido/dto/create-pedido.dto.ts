import { IsInt, Min } from 'class-validator';

export class CreatePedidoDto {
    @IsInt({ message: 'clienteId debe ser un número entero' })
    @Min(1, { message: 'clienteId debe ser mayor o igual a 1' })
    clienteId: number;

    @IsInt({ message: 'platoId debe ser un número entero' })
    @Min(1, { message: 'platoId debe ser mayor o igual a 1' })
    platoId: number;
}