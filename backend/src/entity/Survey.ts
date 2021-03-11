import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, ManyToOne } from 'typeorm';
import { Question } from './Question';
import { User } from './User';

@Entity()
export class Survey {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @ManyToMany(() => Question)
  @JoinTable()
  questions: Question[];

  @ManyToOne(() => User, user => user.surveys)
  user: User;
}
