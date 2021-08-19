import { InjectQueue, OnQueueActive, Process, Processor } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Job, Queue } from 'bull';

@Injectable()
@Processor('audio')
export class QueueService {
  constructor(@InjectQueue('audio') private audioQueue: Queue) {}

  async start() {
    const job = await this.audioQueue.add({
      foo: 'bar',
    });
  }
}
export interface IQueueService {
  start(): void;
}
