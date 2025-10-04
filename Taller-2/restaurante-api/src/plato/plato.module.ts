import { Module } from '@nestjs/common';
import { PlatoController } from './plato.controller';
import { PlatoService } from './plato.service';

@Module({
    controllers: [PlatoController],
    providers: [PlatoService],
})
export class PlatoModule {}