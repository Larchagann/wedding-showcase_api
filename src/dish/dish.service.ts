import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { Dish } from './dish.model';

@Injectable()
export class DishService {
  constructor(
    @InjectRepository(Dish)
    public dishs: Repository<Dish>,
  ) {}

  async findAllByIdInvitation(
    idInvitation: number,
  ): Promise<Dish[]> {
    const options: FindManyOptions = {
      where: { invitation: idInvitation },
      relations: ['dishType'],
    };
    const result = await this.dishs.find(options);
    return result;
  }

  async createDish(dishData: Dish): Promise<any> {
    const dish = this.dishs.create(dishData);
    return this.dishs.save(dish);
  }

  async deleteDish(idDish: number): Promise<void> {
    console.log("idDish",idDish)
    const options: FindManyOptions = {
      where: { idDish: idDish },
    };
    const dish = await this.dishs.find(options);
    console.log("Dish",dish)
    if (!dish) {
      throw new NotFoundException(`Aucun plat avec l'id ${idDish} trouvée.`);
    }
    await this.dishs.delete(idDish);
  }
}
