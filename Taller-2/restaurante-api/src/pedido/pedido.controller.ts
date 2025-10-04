import { Controller, Post, Get, Put, Delete, Body, Param, ParseIntPipe } from '@nestjs/common';
import { PedidoService } from './pedido.service';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { Pedido } from './pedido.interface';

@Controller('pedidos')
export class PedidoController {
    constructor(private readonly pedidoService: PedidoService) {}

    @Post()
    create(@Body() createPedidoDto: CreatePedidoDto) {
        const pedido: Pedido = this.pedidoService.create(createPedidoDto);
        return { message: 'Pedido creado', data: pedido };
    }

    @Get()
    getAll() {
        const pedidos: Pedido[] = this.pedidoService.findAll();
        return { message: 'Lista de pedidos', data: pedidos };
    }

    @Get(':id')
    getOne(@Param('id', ParseIntPipe) id: number) {
        const pedido: Pedido = this.pedidoService.findOne(id);
        return { message: 'Pedido encontrado', data: pedido };
    }

    @Put(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() datos: any) {
        const pedido: Pedido = this.pedidoService.update(id, datos);
        return { message: 'Pedido actualizado', data: pedido };
    }

    @Delete(':id')
    delete(@Param('id', ParseIntPipe) id: number) {
        const pedido: Pedido = this.pedidoService.remove(id);
        return { message: 'Pedido eliminado', data: pedido };
    }
}