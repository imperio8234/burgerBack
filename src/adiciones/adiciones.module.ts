import { Module } from '@nestjs/common';
import { AdicionesService } from './adiciones.service';
import { AdicionesController } from './adiciones.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Adicion } from './entity/adiciones.entity';
import { AuthModule } from 'src/util/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Adicion]), AuthModule],
  providers: [AdicionesService],
  controllers: [AdicionesController]
})
export class AdicionesModule {}
