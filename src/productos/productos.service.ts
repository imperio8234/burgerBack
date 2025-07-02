import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Producto } from './entity/productos.entity';
import { CreateProductoDto } from './dto/productosDto';

@Injectable()
export class ProductosService {
  constructor(
    @InjectRepository(Producto)
    private readonly productoRepository: Repository<Producto>
  ) {}

  async create(data: CreateProductoDto): Promise<Producto> {
    const producto = this.productoRepository.create(data);
    return await this.productoRepository.save(producto);
  }

  async findAll(): Promise<Producto[]> {
    return await this.productoRepository.find();
  }

  async findOne(id: string): Promise<Producto> {
    const producto = await this.productoRepository.findOneBy({ id });
    if (!producto) {
      throw new HttpException('Producto no encontrado', HttpStatus.NOT_FOUND);
    }
    return producto;
  }

  async update(id: string, data: Partial<CreateProductoDto>): Promise<Producto> {
    const producto = await this.findOne(id);
    Object.assign(producto, data);
    return await this.productoRepository.save(producto);
  }

  async remove(id: string): Promise<void> {
    const producto = await this.findOne(id);
    await this.productoRepository.remove(producto);
  }
}
