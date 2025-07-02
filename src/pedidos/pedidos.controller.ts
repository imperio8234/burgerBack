import { Controller, Post, Body, Get, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { PedidosService } from './pedidos.service';
import { CreatePedidoDto } from './dto/pedidosDto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/util/authGuard';

@ApiBearerAuth()
@Controller('pedidos')
export class PedidosController {
    constructor(private readonly pedidosService: PedidosService) { }

    @UseGuards(JwtAuthGuard)
    @Post()
    create(@Body() data: CreatePedidoDto) {
        return this.pedidosService.create(data);
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    findAll() {
        return this.pedidosService.findAll();
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.pedidosService.findOne(id);
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id')
    update(@Param('id') id: string, @Body() data: Partial<CreatePedidoDto>) {
        return this.pedidosService.update(id, data);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.pedidosService.remove(id);
    }
}
