import { Invitation } from 'src/invitation/invitation.model';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class Guest {
  @PrimaryGeneratedColumn()
  idGuest: number;

  @Column()
  lastName: string;

  @Column()
  firstName: string;

  @Column()
  isChild: boolean;

  @Column()
  isMainGuest: boolean;

  @Column()
  isNeedAccomodation: boolean;

  @Column()
  isPresent: boolean;

  @ManyToOne(() => Invitation, (Invitation) => Invitation.guest)
  invitation: Invitation;
}
