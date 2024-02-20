import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { DishTypeService } from './dish-type.service';
import { DishType } from './dish-type.model';
import { AuthGuard } from 'src/auth/auth.guard';
import { AuthAdminGuard } from 'src/auth-admin/auth-admin.guard';

@Controller('dish-type')
export class DishTypeController {
  constructor(private readonly dishTypeService: DishTypeService) {}

  //Pour front admin
  @HttpCode(HttpStatus.OK)
  @Get('admin/all')
  @UseGuards(AuthAdminGuard)
  findAllAdmin(): Promise<DishType[]> {
    return this.dishTypeService.findAll();
  }

  @HttpCode(HttpStatus.OK)
  @Post('admin')
  @UseGuards(AuthAdminGuard)
  createDishType(@Body() dishTypeData: DishType): Promise<any> {
    return this.dishTypeService.createDishType(dishTypeData);
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthAdminGuard)
  @Put('admin/:id')
  async updateDishType(
    @Param('id') idDishTyoe: number,
    @Body() updatedDishTypeData: DishType,
  ): Promise<DishType> {
    return this.dishTypeService.updateDishType(idDishTyoe, updatedDishTypeData);
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthAdminGuard)
  @Delete('admin/:id')
  async deleteDishType(@Param('id') idDishType: number) {
    await this.dishTypeService.deleteDishType(idDishType);
    return { message: 'Type de repas supprimé avec succès !' };
  }

  //Pour front public
  @HttpCode(HttpStatus.OK)
  @Get()
  @UseGuards(AuthGuard)
  findAll(): Promise<DishType[]> {
    return this.dishTypeService.findAll();
  }
}
