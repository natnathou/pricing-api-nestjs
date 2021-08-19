import { Module } from '@nestjs/common';
import { QueueService } from './queue.service';
import { QueueController } from './queue.controller';
import { BullModule } from '@nestjs/bull';
import { AudioConsumer } from './queue.consumer';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'audio',
    }),
  ],
  providers: [
    AudioConsumer,
    { provide: 'IQueueService', useClass: QueueService },
  ],
  controllers: [QueueController],
})
export class QueueModule {}
