import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Admin {
  @PrimaryGeneratedColumn()
  idAdmin: number;

  @Column()
  login: string;

  @Column()
  password: string;
}
