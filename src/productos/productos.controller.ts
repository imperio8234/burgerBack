import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  Delete,
  UseGuards,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ProductosService } from './productos.service';
import { CreateProductoDto } from './dto/productosDto';
import { ApiBearerAuth, ApiConsumes } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/util/authGuard';

@ApiBearerAuth()
@Controller('productos')
export class ProductosController {
  constructor(private readonly productosService: ProductosService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(FileInterceptor('foto')) // debe coincidir con el nombre del campo del form-data
  @ApiConsumes('multipart/form-data')
  create(
    @Body() data: CreateProductoDto,
    @UploadedFile() foto: Express.Multer.File,
  ) {
    return this.productosService.create(data, foto); // Se pasa la imagen
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
  @UseInterceptors(FileInterceptor('foto')) // permite actualizar la imagen
  @ApiConsumes('multipart/form-data')
  update(
    @Param('id') id: string,
    @Body() data: Partial<CreateProductoDto>,
    @UploadedFile() foto: Express.Multer.File,
  ) {
    return this.productosService.update(id, data, foto); // También se puede actualizar la imagen
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productosService.remove(id);
  }
}
