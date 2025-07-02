// productos.service.ts
import {
  Injectable,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Producto } from './entity/productos.entity';
import { CreateProductoDto } from './dto/productosDto';
import { SupabaseService } from 'src/servicios/storageFile';

@Injectable()
export class ProductosService {
  private readonly BUCKET = 'documentos';

  constructor(
    @InjectRepository(Producto)
    private readonly productoRepository: Repository<Producto>,
    private readonly supabaseService: SupabaseService,
  ) {}

  async create(data: CreateProductoDto, file?: Express.Multer.File): Promise<Producto> {
    let publicUrl = '';
    if (file) {
      const result = await this.supabaseService.uploadFile(
        this.BUCKET,
        file.buffer,
        file.mimetype,
        file.originalname,
      );
      publicUrl = result.publicUrl;
    }

    const producto = this.productoRepository.create({
      ...data,
      foto: publicUrl || data.foto,
    });
   console.log("producto", producto)
    return await this.productoRepository.save(producto);
  }

  async update(
    id: string,
    data: Partial<CreateProductoDto>,
    file?: Express.Multer.File,
  ): Promise<Producto> {
    const producto = await this.findOne(id);

    if (file) {
      const result = await this.supabaseService.uploadFile(
        this.BUCKET,
        file.buffer,
        file.mimetype,
        file.originalname,
      );
      data.foto = result.publicUrl;
    }

    Object.assign(producto, data);
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

  async remove(id: string): Promise<void> {
    const producto = await this.findOne(id);
    await this.productoRepository.remove(producto);
  }
}
