import { Queue } from 'bullmq';
import { addJobRequest, IQueueProvider, registerQueueRequest } from '../IQueueProvider';

class BullQueueProvider implements IQueueProvider {
    private queues: Queue[];

    constructor() {
        this.queues = []
    }

    register( { queueName }: registerQueueRequest): void {
        const queue = this.queues.find(q => q.name === queueName)

        if (queue) {
            throw new Error('Queue name already registered')
        }

        this.queues.push(new Queue(queueName))
    }
    add({ queueName, job, jobName }: addJobRequest ): void {
        const queue = this.queues.find(q => q.name === queueName)

        if (!queue) {
            throw new Error('Queue dont exist')
        }

        queue.add(jobName, job)
    }

}

export { BullQueueProvider }
