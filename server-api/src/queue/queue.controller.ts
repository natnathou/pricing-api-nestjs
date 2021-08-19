import { Controller, Get, Inject } from '@nestjs/common';
import { IQueueService } from './queue.service';

@Controller('queue')
export class QueueController {
  constructor(@Inject('IQueueService') private QueueService: IQueueService) {}

  @Get('audio')
  startAudio() {
    this.QueueService.startAudio();
  }

  @Get('video')
  startVideo() {
    this.QueueService.startVideo();
  }
}
