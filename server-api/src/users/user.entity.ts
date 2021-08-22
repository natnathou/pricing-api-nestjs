import { Logger } from '@nestjs/common';
import { Exclude, Expose } from 'class-transformer';
import { Report } from 'src/reports/reports.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  AfterInsert,
  AfterUpdate,
  AfterRemove,
  Unique,
  OneToMany,
} from 'typeorm';

@Entity()
@Unique(['email'])
export class User {
  private readonly logger = new Logger();

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column('text', { array: true, default: [] })
  tokens: string[];

  @OneToMany(() => Report, (report) => report.user)
  reports: Report[];

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
