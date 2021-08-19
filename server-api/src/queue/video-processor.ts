import { Job, DoneCallback } from 'bull';
import { isMainThread, threadId } from 'worker_threads';

export default function (job: Job, cb: DoneCallback) {
  console.log(`video isMainThread ${isMainThread}`);
  console.log(`video thread id is ${threadId}`);
  console.log('video process id is', process.pid);
  cb(null, 'It works');
}
