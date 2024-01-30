import { Module } from '@nestjs/common';
import { DishTypeService } from './dish-type.service';
import { DishTypeController } from './dish-type.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DishType } from './dish-type.model';

@Module({
  imports: [TypeOrmModule.forFeature([DishType])],
  controllers: [DishTypeController],
  providers: [DishTypeService],
  exports: [DishTypeService],
})
export class DishTypeModule {}
