import { Controller, Post, Body, Get, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { ProductosService } from './productos.service';
import { CreateProductoDto } from './dto/productosDto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/util/authGuard';

@ApiBearerAuth()
@Controller('productos')
export class ProductosController {
  constructor(private readonly productosService: ProductosService) { }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() data: CreateProductoDto) {
    return this.productosService.create(data);
  }


  @Get()
  findAll() {
    return this.productosService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productosService.findOne(id);
  }


  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(@Param('id') id: string, @Body() data: Partial<CreateProductoDto>) {
    return this.productosService.update(id, data);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productosService.remove(id);
  }
}
