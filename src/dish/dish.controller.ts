import {
  Body,
  Controller,
  Get,
  Post,
  HttpCode,
  HttpStatus,
  Query,
  Delete,
  Param,
  UseGuards,
} from '@nestjs/common';
import { DishService } from './dish.service';
import { Dish } from './dish.model';
import { AuthGuard } from '../auth/auth.guard';

@Controller('dish')
export class DishController {
  constructor(private readonly dishService: DishService) {}

  //Pour front public
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @Get('all')
  findAllByIdInvitation(@Query() query): Promise<Dish[]> {
    return this.dishService.findAllByIdInvitation(query);
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @Post()
  createDish(@Body() dishData: Dish): Promise<any> {
    return this.dishService.createDish(dishData);
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @Delete(':id')
  async deleteDish(@Param('id') idDish: number) {
    await this.dishService.deleteDish(idDish);
    return { message: 'Plat supprimée avec succès !' };
  }
}
