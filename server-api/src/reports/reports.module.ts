import { Module } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { ReportsController } from './reports.controller';
import { Report } from './reports.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Report]), UsersModule],
  providers: [{ provide: 'IReportsService', useClass: ReportsService }],
  controllers: [ReportsController],
})
export class ReportsModule {}
