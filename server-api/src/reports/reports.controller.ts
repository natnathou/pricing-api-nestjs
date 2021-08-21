import { Body, Controller, Inject, Post, UseGuards } from '@nestjs/common';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { AuthGuard } from 'src/guards/auth.guard';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { CreateReportDto } from './dtos/createReport.dto';
import { ReportDto } from './dtos/report.dto';
import { IReportsService } from './reports.service';

@UseGuards(AuthGuard)
@Serialize(ReportDto)
@Controller('reports')
export class ReportsController {
  constructor(
    @Inject('IReportsService') private readonly reportsService: IReportsService,
  ) {}

  @Post('create')
  async create(
    @Body() body: CreateReportDto,
    @CurrentUser() currentUser: { userId: number; token: string },
  ) {
    return await this.reportsService.create(body, currentUser);
  }
}
