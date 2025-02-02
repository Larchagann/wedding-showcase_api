import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Guest } from '../guest/guest.model';
import { Dish } from 'src/dish/dish.model';

@Entity()
export class Invitation {
  @PrimaryGeneratedColumn()
  idInvitation: number;

  @Column()
  name: string;

  @Column()
  mailAddress: string;

  @Column()
  isAnswered: boolean;

  @Column()
  isCityHallInvited: boolean;

  @OneToMany(() => Guest, (guest) => guest.invitation, { onDelete: 'CASCADE' })
  guest: Guest[];

  @OneToMany(() => Dish, (dish) => dish.invitation, { onDelete: 'CASCADE' })
  dish: Dish[];
}
