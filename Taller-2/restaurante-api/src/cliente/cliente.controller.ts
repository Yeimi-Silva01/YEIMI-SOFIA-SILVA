import { Controller, Get, Post, Delete, Body, Param, ParseIntPipe } from '@nestjs/common';
import { ClienteService } from './cliente.service';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { Cliente } from './cliente.interface';

@Controller('clientes')
export class ClienteController {
    constructor(private readonly clienteService: ClienteService) {}

    @Post()
    create(@Body() dto: CreateClienteDto) {
        const cliente: Cliente = this.clienteService.create(dto);
        return { message: 'Cliente creado', data: cliente };
    }

    @Get()
    findAll() {
        const clientes: Cliente[] = this.clienteService.findAll();
        return { message: 'Lista de clientes', data: clientes };
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        const cliente: Cliente = this.clienteService.findOne(id);
        return { message: 'Cliente encontrado', data: cliente };
    }

    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        const cliente: Cliente = this.clienteService.remove(id);
        return { message: 'Cliente eliminado', data: cliente };
    }
}