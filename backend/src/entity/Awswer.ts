import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { Alternative } from './Alternative';
import { Survey } from './Survey';

@Entity()
export class Awswer {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  email!: string;

  @OneToOne(() => Survey)
  @JoinColumn()
  survey!: Survey;

  @OneToOne(() => Alternative)
  @JoinColumn()
  alternative!: Alternative;
}
