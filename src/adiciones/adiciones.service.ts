import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Adicion } from './entity/adiciones.entity';
import { CreateAdicionDto } from './dto/adicionesDto';

@Injectable()
export class AdicionesService {
  constructor(
    @InjectRepository(Adicion)
    private readonly adicionRepository: Repository<Adicion>
  ) {}

  async create(data: CreateAdicionDto): Promise<Adicion> {
    try {
      const adicion = this.adicionRepository.create(data);
      return await this.adicionRepository.save(adicion);
    } catch (error) {
      throw error instanceof HttpException ? error : new HttpException('Error al crear la adición', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAll(): Promise<Adicion[]> {
    try {
      return await this.adicionRepository.find();
    } catch (error) {
      throw error instanceof HttpException ? error : new HttpException('Error al obtener las adiciones', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOne(id: string): Promise<Adicion> {
    try {
      const adicion = await this.adicionRepository.findOneBy({ id });
      if (!adicion) {
        throw new HttpException('Adición no encontrada', HttpStatus.NOT_FOUND);
      }
      return adicion;
    } catch (error) {
      throw error instanceof HttpException ? error : new HttpException('Error al buscar la adición', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async update(id: string, data: Partial<CreateAdicionDto>): Promise<Adicion> {
    try {
      const adicion = await this.findOne(id);
      Object.assign(adicion, data);
      return await this.adicionRepository.save(adicion);
    } catch (error) {
      throw error instanceof HttpException ? error : new HttpException('Error al actualizar la adición', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async remove(id: string): Promise<void> {
    try {
      const adicion = await this.findOne(id);
      await this.adicionRepository.remove(adicion);
    } catch (error) {
      throw error instanceof HttpException ? error : new HttpException('Error al eliminar la adición', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
