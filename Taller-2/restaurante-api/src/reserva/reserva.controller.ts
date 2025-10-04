import { Controller, Get, Post, Delete, Body, Param, ParseIntPipe } from '@nestjs/common';
import { ReservaService } from './reserva.service';
import { CreateReservaDto } from './dto/create-reserva.dto';
import { Reserva } from './reserva.interface';

@Controller('reservas')
export class ReservaController {
    constructor(private readonly reservaService: ReservaService) {}

    @Post()
    create(@Body() dto: CreateReservaDto) {
        const reserva: Reserva = this.reservaService.create(dto);
        return { message: 'Reserva creada', data: reserva };
    }

    @Get()
    findAll() {
        const reservas: Reserva[] = this.reservaService.findAll();
        return { message: 'Lista de reservas', data: reservas };
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        const reserva: Reserva = this.reservaService.findOne(id);
        return { message: 'Reserva encontrada', data: reserva };
    }

    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        const reserva: Reserva = this.reservaService.remove(id);
        return { message: 'Reserva eliminada', data: reserva };
    }
}