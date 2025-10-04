import { Injectable, NotFoundException } from '@nestjs/common';
import { Pedido } from './pedido.interface';
import { CreatePedidoDto } from './dto/create-pedido.dto';

@Injectable()
export class PedidoService {
    private pedidos: Pedido[] = [];

    create(createPedidoDto: CreatePedidoDto): Pedido {
        const nuevoPedido: Pedido = {
            id: this.pedidos.length + 1,
            clienteId: createPedidoDto.clienteId,
            platoId: createPedidoDto.platoId,
            estado: 'pendiente',
        };
        this.pedidos.push(nuevoPedido);
        return nuevoPedido;
    }

    findAll(): Pedido[] {
        return this.pedidos;
    }

    findOne(id: number): Pedido {
        const pedido = this.pedidos.find(p => p.id === id);
        if (!pedido) throw new NotFoundException('Pedido con id ${id} no encontrado');
        return pedido;
    }

    update(id: number, datos: Partial<{ clienteId: number; platoId: number; estado: string }>): Pedido {
        const pedido = this.findOne(id);
        pedido.clienteId = datos.clienteId ?? pedido.clienteId;
        pedido.platoId = datos.platoId ?? pedido.platoId;
        pedido.estado = datos.estado ?? pedido.estado;
        return pedido;
    }

    remove(id: number): Pedido {
        const index = this.pedidos.findIndex(p => p.id === id);
        if (index === -1) throw new NotFoundException('Pedido con id ${id} no encontrado');
        return this.pedidos.splice(index, 1)[0];
    }
}