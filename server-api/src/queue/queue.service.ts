import { InjectQueue, OnQueueActive, Process, Processor } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
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
  }
}

export interface IQueueService {
  startAudio(): void;
  startVideo(): void;
}
