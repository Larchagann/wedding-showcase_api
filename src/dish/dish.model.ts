import { DishType } from 'src/dish-type/dish-type.model';
import { Invitation } from 'src/invitation/invitation.model';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinTable, JoinColumn } from 'typeorm';

@Entity()
export class Dish {
  @PrimaryGeneratedColumn()
  idDish: number;

  @Column()
  label: string;

  @Column()
  quantity: string;

  @ManyToOne(() => DishType, (dishType) => dishType.dish)
  @JoinColumn({ name: 'dishTypeIdDishType' })
  dishType: DishType;

  @ManyToOne(() => Invitation, (invitation) => invitation.dish)
  @JoinColumn({ name: 'invitationIdInvitation' })
  invitation: Invitation;
}
