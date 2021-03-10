import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate } from 'typeorm';
import { hash } from 'argon2';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  password: string;

  async hashPassword(): Promise<string> {
    return await hash(this.password);
  }

  @BeforeInsert()
  async insertPassword(): Promise<void> {
    this.password = await this.hashPassword();
  }

  @BeforeUpdate()
  async updatePassword(): Promise<void> {
    this.password = await this.hashPassword();
  }
}
