import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne, JoinColumn } from 'typeorm';
import { Answer } from './Answer';

@Entity()
export class Question {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  awswers: [string];

  @Column()
  @OneToMany(() => Answer, answer => answer.question)
  answers: Answer[];

  @OneToOne(() => Answer)
  @JoinColumn()
  rightAnswer: Answer;
}
