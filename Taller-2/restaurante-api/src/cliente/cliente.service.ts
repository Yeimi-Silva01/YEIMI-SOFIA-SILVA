import { Injectable, NotFoundException } from '@nestjs/common';
import { Cliente } from './cliente.interface';
import { CreateClienteDto } from './dto/create-cliente.dto';

@Injectable()
export class ClienteService {
    private clientes: Cliente[] = [];

    create(dto: CreateClienteDto): Cliente {
        const nuevo: Cliente = { id: this.clientes.length + 1, ...dto };
        this.clientes.push(nuevo);
        return nuevo;
    }

    findAll(): Cliente[] {
        return this.clientes;
    }

    findOne(id: number): Cliente {
        const cliente = this.clientes.find(c => c.id === id);
        if (!cliente) throw new NotFoundException('Cliente con id ${id} no encontrado');
        return cliente;
    }

    remove(id: number): Cliente {
        const index = this.clientes.findIndex(c => c.id === id);
        if (index === -1) throw new NotFoundException('Cliente con id ${id} no encontrado');
        return this.clientes.splice(index, 1)[0];
    }
}