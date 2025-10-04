import { Controller, Get, Post, Delete, Body, Param, ParseIntPipe } from '@nestjs/common';
import { PlatoService } from './plato.service';
import { CreatePlatoDto } from './dto/create-plato.dto';
import { Plato } from './plato.interface';

@Controller('platos')
export class PlatoController {
    constructor(private readonly platoService: PlatoService) {}

    @Post()
    create(@Body() dto: CreatePlatoDto) {
        const plato: Plato = this.platoService.create(dto);
        return { message: 'Plato creado', data: plato };
    }

    @Get()
    findAll() {
        const platos: Plato[] = this.platoService.findAll();
        return { message: 'Lista de platos', data: platos };
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        const plato: Plato = this.platoService.findOne(id);
        return { message: 'Plato encontrado', data: plato };
    }

    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        const plato: Plato = this.platoService.remove(id);
        return { message: 'Plato eliminado', data: plato };
    }
}