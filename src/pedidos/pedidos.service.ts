import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pedido } from './entity/pedidos.entity';
import { CreatePedidoDto } from './dto/pedidosDto';
import { PedidoItem } from 'src/pedidos_items/entity/pedidos_item.entity';
import { Usuario } from 'src/user/userEntity/user.entity';


@Injectable()
export class PedidosService {
    constructor(
        @InjectRepository(Pedido)
        private readonly pedidoRepository: Repository<Pedido>,
        @InjectRepository(PedidoItem)
        private readonly pedidoItemRepository: Repository<PedidoItem>,
        @InjectRepository(Usuario)
        private readonly usuarioRepository: Repository<Usuario>,
    ) { }


    async create(data: CreatePedidoDto) {
        console.log("datos", data)
        try {
            const { usuario, items, ...rest } = data;
            
            if (!items) {
                 throw new HttpException("debes de seleccionar algun producto", HttpStatus.NOT_FOUND)
            }
            const pedido = this.pedidoRepository.create({
                ...rest,
                usuario: { id: usuario } as any,
                items: items.map(item => this.pedidoItemRepository.create(item)),
            });

            return await this.pedidoRepository.save(pedido);
        } catch (error) {
            console.log("error", error)
            throw error instanceof HttpException
                ? error
                : new HttpException('Error al crear el pedido', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async findAll(): Promise<Pedido[]> {
        try {
            return await this.pedidoRepository.find({ relations: {
                items: {
                    acompanantes: true,
                    adiciones: true
                },
                usuario: true
            }});
        } catch (error) {
            throw error instanceof HttpException ? error : new HttpException('Error al obtener los pedidos', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async findAllByUser(userId: string): Promise<Pedido[]> {
        try {
            return await this.pedidoRepository.find({ where:{usuario:{id: userId}}, relations: {
                items: {
                    acompanantes: true,
                    adiciones: true
                },
                usuario: true
            }});
        } catch (error) {
            throw error instanceof HttpException ? error : new HttpException('Error al obtener los pedidos', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async findOne(id: string): Promise<Pedido> {
        try {
            const pedido = await this.pedidoRepository.findOne({ where: { id }, relations:  {
                items: true,
                usuario: true
            } });
            if (!pedido) {
                throw new HttpException('Pedido no encontrado', HttpStatus.NOT_FOUND);
            }
            return pedido;
        } catch (error) {
            throw error instanceof HttpException ? error : new HttpException('Error al buscar el pedido', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    async update(id: string, data: Partial<CreatePedidoDto>): Promise<Pedido> {
        try {
            const { usuario, items, ...rest } = data;
            const pedido = await this.findOne(id);

            if (usuario) {
                const user = await this.usuarioRepository.findOneBy({ id: usuario });
                if (!user) throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
                pedido.usuario = user;
            }



            if (items) {
                pedido.items = items.map(item => this.pedidoItemRepository.create(item));
            }

            Object.assign(pedido, rest);
            return await this.pedidoRepository.save(pedido);
        } catch (error) {
            throw error instanceof HttpException ? error : new HttpException('Error al actualizar el pedido', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    async remove(id: string): Promise<void> {
        try {
            const pedido = await this.findOne(id);
            await this.pedidoRepository.remove(pedido);
        } catch (error) {
            throw error instanceof HttpException ? error : new HttpException('Error al eliminar el pedido', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
