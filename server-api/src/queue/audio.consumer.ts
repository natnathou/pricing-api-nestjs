import { OnQueueActive, Process, Processor } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Job } from 'bull';
import { isMainThread } from 'worker_threads';

@Processor('audio')
@Injectable()
export class AudioConsumer {
  @Process()
  async transcode(job: Job<unknown>) {
    console.log(`audio process is main thread ${isMainThread}`);
    console.log('audio process is ', process.pid);
    let progress = 0;
    for (let i = 0; i < 100; i++) {
      progress += 10;
      await job.progress(progress);
    }

    return {};
  }

  @OnQueueActive()
  onActive(job: Job) {
    console.log(
      `Processing job ${job.id} of type ${job.name} with data ${job.data}...`,
    );
  }
}
