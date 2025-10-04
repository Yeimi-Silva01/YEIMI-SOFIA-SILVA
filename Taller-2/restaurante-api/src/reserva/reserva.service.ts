import { Injectable, NotFoundException } from '@nestjs/common';
import { Reserva } from './reserva.interface';
import { CreateReservaDto } from './dto/create-reserva.dto';

@Injectable()
export class ReservaService {
    private reservas: Reserva[] = [];

    create(dto: CreateReservaDto): Reserva {
        const nueva: Reserva = { id: this.reservas.length + 1, ...dto };
        this.reservas.push(nueva);
        return nueva;
    }

    findAll(): Reserva[] {
        return this.reservas;
    }

    findOne(id: number): Reserva {
        const reserva = this.reservas.find(r => r.id === id);
        if (!reserva) throw new NotFoundException('Reserva con id ${id} no encontrada');
        return reserva;
    }

    remove(id: number): Reserva {
        const index = this.reservas.findIndex(r => r.id === id);
        if (index === -1) throw new NotFoundException('Reserva con id ${id} no encontrada');
        return this.reservas.splice(index, 1)[0];
    }
}