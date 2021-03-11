import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import { Answer } from './Answer';

@Entity()
export class Question {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @OneToMany(() => Answer, answer => answer.question)
  answers: Answer[];

  @OneToOne(() => Answer)
  @JoinColumn()
  rightAnswer: Answer;
}
