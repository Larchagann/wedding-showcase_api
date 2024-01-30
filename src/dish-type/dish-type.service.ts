import { Injectable } from '@nestjs/common';
import { DishType } from './dish-type.model';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class DishTypeService {
    constructor(
        @InjectRepository(DishType)
        public dishTypes: Repository<DishType>,
      ) {}

    findAll(): Promise<DishType[]> {
        return this.dishTypes.find()
    }
}
