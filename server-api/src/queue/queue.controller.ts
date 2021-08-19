import { Controller, Get, Inject } from '@nestjs/common';
import { IQueueService } from './queue.service';

@Controller('queue')
export class QueueController {
  constructor(@Inject('IQueueService') private QueueService: IQueueService) {}

  @Get()
  Start() {
    this.QueueService.start();
  }
}
