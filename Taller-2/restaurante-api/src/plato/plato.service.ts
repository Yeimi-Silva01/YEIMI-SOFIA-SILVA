import { Injectable, NotFoundException } from '@nestjs/common';
import { Plato } from './plato.interface';
import { CreatePlatoDto } from './dto/create-plato.dto';

@Injectable()
export class PlatoService {
    private platos: Plato[] = [];

    create(dto: CreatePlatoDto): Plato {
        const nuevo: Plato = { id: this.platos.length + 1, ...dto };
        this.platos.push(nuevo);
        return nuevo;
    }

    findAll(): Plato[] {
        return this.platos;
    }

    findOne(id: number): Plato {
        const plato = this.platos.find(p => p.id === id);
        if (!plato) throw new NotFoundException('Plato con id ${id} no encontrado');
        return plato;
    }

    remove(id: number): Plato {
        const index = this.platos.findIndex(p => p.id === id);
        if (index === -1) throw new NotFoundException('Plato con id ${id} no encontrado');
        return this.platos.splice(index, 1)[0];
    }
}