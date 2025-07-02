import { Controller, Post, Body, Get, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { AdicionesService } from './adiciones.service';
import { CreateAdicionDto } from './dto/adicionesDto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/util/authGuard';

@ApiBearerAuth()
@Controller('adiciones')
export class AdicionesController {
    constructor(private readonly adicionesService: AdicionesService) { }

    @UseGuards(JwtAuthGuard)
    @Post()
    create(@Body() data: CreateAdicionDto) {
        return this.adicionesService.create(data);
    }

    @Get()
    findAll() {
        return this.adicionesService.findAll();
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.adicionesService.findOne(id);
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id')
    update(@Param('id') id: string, @Body() data: Partial<CreateAdicionDto>) {
        return this.adicionesService.update(id, data);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.adicionesService.remove(id);
    }
}
