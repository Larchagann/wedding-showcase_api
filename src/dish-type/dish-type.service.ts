import { Injectable, NotFoundException } from '@nestjs/common';
import { DishType } from './dish-type.model';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';

@Injectable()
export class DishTypeService {
  constructor(
    @InjectRepository(DishType)
    public dishTypes: Repository<DishType>,
  ) {}

  //Pour front admin
  async createDishType(dishTypeData: DishType): Promise<any> {
    const dishType = this.dishTypes.create(dishTypeData);
    return this.dishTypes.save(dishType);
  }

  async updateDishType(
    idDishType: number,
    updatedDishTypeData: DishType,
  ): Promise<DishType> {
    const options: FindOneOptions = {
      where: { idDishType: idDishType },
    };

    const dishType = await this.dishTypes.findOne(options);

    if (!dishType) {
      throw new NotFoundException(
        `Aucun type de repas avec l'id ${idDishType} trouvé.`,
      );
    }

    Object.assign(dishType, updatedDishTypeData);

    const updatedDishType = await this.dishTypes.save(dishType);
    return updatedDishType;
  }

  async deleteDishType(idDishType: number): Promise<void> {
    const options: FindManyOptions = {
      where: { idDishType: idDishType },
    };

    const dishType = await this.dishTypes.find(options);

    if (!dishType) {
      throw new NotFoundException(
        `Aucun type de repas avec l'id ${idDishType} trouvé.`,
      );
    }
    await this.dishTypes.delete(idDishType);
  }

  //Pour les deux
  async findAll(): Promise<DishType[]> {
    return this.dishTypes.find();
  }
}
