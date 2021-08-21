import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IUsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { CreateReportDto } from './dtos/createReport.dto';
import { Report } from './reports.entrity';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Report)
    private readonly reportsRepository: Repository<Report>,
    @Inject('IUsersService')
    private readonly usersService: IUsersService,
  ) {}

  async create(
    data: CreateReportDto,
    currentUser: { userId: number; token: string },
  ) {
    const report = await this.reportsRepository.create(data);
    const user = await this.usersService.findOne(currentUser.userId);
    report.user = user;
    await this.reportsRepository.save(report);

    return report;
  }
}
export interface IReportsService {
  create(
    data: CreateReportDto,
    currentUser: { userId: number; token: string },
  ): {};
}
