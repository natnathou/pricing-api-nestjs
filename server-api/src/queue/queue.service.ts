import {
  InjectQueue,
  OnQueueActive,
  OnQueueProgress,
  Process,
  Processor,
} from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Job, Queue } from 'bull';
@Injectable()
@Processor('audio')
export class QueueService {
  constructor(
    @InjectQueue('audio') private audioQueue: Queue,
    @InjectQueue('video') private videoQueue: Queue,
  ) {}

  async startAudio() {
    const job = await this.audioQueue.add({
      foo: 'bar',
    });
  }

  async startVideo() {
    const job = await this.videoQueue.add({
      foo: 'bar',
    });

    this.videoQueue.on('completed', (job, res) => {
      console.log(res);
    });
  }
}

export interface IQueueService {
  startAudio(): void;
  startVideo(): void;
}
