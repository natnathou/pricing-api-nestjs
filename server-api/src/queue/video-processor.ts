import { Job, DoneCallback } from 'bull';
import { isMainThread } from 'worker_threads';

export default function (job: Job, cb: DoneCallback) {
  console.log(`video process is main thread ${isMainThread}`);
  console.log('video process in video is:', process.pid);
  cb(null, 'It works');
}
