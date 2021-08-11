import { Logger } from '@nestjs/common';
import { Exclude, Expose } from 'class-transformer';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  AfterInsert,
  AfterUpdate,
  AfterRemove,
  Unique,
  Index,
} from 'typeorm';

@Entity()
@Unique(['email'])
export class User {
  @Exclude()
  private logger = new Logger();

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Expose()
  email: string;

  @Column()
  password: string;

  @AfterInsert()
  logInsert() {
    const user = JSON.stringify({ id: this.id, email: this.email });
    this.logger.debug(`the user ${user} was insert`);
  }

  @AfterUpdate()
  logUpdate() {
    const user = JSON.stringify({ id: this.id, email: this.email });
    this.logger.debug(`the user ${user} was update`);
  }

  @AfterRemove()
  logRemove() {
    const user = JSON.stringify({ id: this.id, email: this.email });
    this.logger.debug(`the user ${user} was remove`);
  }
}
