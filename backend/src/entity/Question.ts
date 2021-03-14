import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import { Alternative } from './Alternative';

@Entity()
export class Question {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @OneToMany(() => Alternative, answer => answer.question)
  answers!: Alternative[];

  @OneToOne(() => Alternative)
  @JoinColumn()
  rightAlternative!: Alternative;
}
