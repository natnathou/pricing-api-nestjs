import { Module } from '@nestjs/common';
import { QueueService } from './queue.service';
import { QueueController } from './queue.controller';
import { BullModule } from '@nestjs/bull';
import { AudioConsumer } from './audio.consumer';
import { join } from 'path';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'video',
      processors: [
        join(
          __dirname,
          `video-processor${process.env.NODE_ENV === 'test' ? `.ts` : `.js`}`,
        ),
      ],
    }),
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
export class QueueModule {
  onModuleInit() {
    console.log('Main process is ', process.pid);
  }
}
