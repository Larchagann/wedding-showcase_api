import { Controller, Get } from '@nestjs/common';
import { DishTypeService } from './dish-type.service';
import { DishType } from './dish-type.model';

@Controller('dish-type')
export class DishTypeController {
  constructor(private readonly dishTypeService: DishTypeService) {}

  @Get()
  findAll(): Promise<DishType[]> {
    return this.dishTypeService.findAll();
  }
}
