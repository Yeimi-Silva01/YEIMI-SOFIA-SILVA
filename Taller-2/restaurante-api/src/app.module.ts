import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClienteModule } from './cliente/cliente.module';
import { PlatoModule } from './plato/plato.module';
import { PedidoModule } from './pedido/pedido.module';
import { ReservaModule } from './reserva/reserva.module';

@Module({
  imports: [ClienteModule, PlatoModule, PedidoModule, ReservaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

