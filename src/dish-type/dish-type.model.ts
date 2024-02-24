import { Dish } from 'src/dish/dish.model';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class DishType {
  @PrimaryGeneratedColumn()
  idDishType: number;

  @Column()
  label: string;

  @OneToMany(() => Dish, (dish) => dish.dishType, { onDelete: 'CASCADE' })
  dish: Dish[];
}
