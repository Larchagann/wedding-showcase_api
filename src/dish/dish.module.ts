import { Module } from '@nestjs/common';
import { DishService } from './dish.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DishController } from './dish.controller';
import { Dish } from './dish.model';

@Module({
  imports: [TypeOrmModule.forFeature([Dish])],
  controllers: [DishController],
  providers: [DishService],
  exports: [DishService],
})
export class DishModule {}
