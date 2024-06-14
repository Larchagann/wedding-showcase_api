import { Injectable, NotFoundException, Query } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository, Not } from 'typeorm';
import { Dish } from './dish.model';

@Injectable()
export class DishService {
  constructor(
    @InjectRepository(Dish)
    public dishs: Repository<Dish>,
  ) {}

  //Pour front Admin
  async findAll(): Promise<Dish[]> {
    const options: FindManyOptions = {
      relations: ['invitation', 'dishType'],
    };
    return this.dishs.find(options);
  }

  //Pour front public
  async findAllByIdInvitation(idInvitation: number): Promise<Dish[]> {
    const options: FindManyOptions = {
      where: { invitation: idInvitation },
      relations: ['dishType'],
    };
    const result = await this.dishs.find(options);
    return result;
  }

  async findAllForAllGuest(@Query() query): Promise<Dish[]> {
    const options: FindManyOptions = {
      where: { invitation : Not(query.idInvitation)},
      relations: ['dishType'],
    };
    return this.dishs.find(options);
  }

  async createDish(dishData: Dish): Promise<any> {
    const dish = this.dishs.create(dishData);
    return this.dishs.save(dish);
  }

  async deleteDish(idDish: number): Promise<void> {
    const options: FindManyOptions = {
      where: { idDish: idDish },
    };
    const dish = await this.dishs.find(options);
    if (!dish) {
      throw new NotFoundException(`Aucun plat avec l'id ${idDish} trouvée.`);
    }
    await this.dishs.delete(idDish);
  }
}
