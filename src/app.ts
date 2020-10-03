import express from 'express';
import { BullQueueProvider } from './providers/Queue/implementations/BullQueueProvider';
import { IQueueProvider } from './providers/Queue/IQueueProvider';
import routes from './routes/index';
import cron from 'node-cron'
import { router } from 'bull-board';
import RequestStudentsProcessProcessor from './workers/RequestStudentProcess/RequestStudentsProcessProcessor';
import { Worker } from 'bullmq';
import ProcessStudentProcessor from './workers/ProcessStudent/ProcessStudentProcessor';

class App {
    public express: express.Application;

    public queueProvider: IQueueProvider;

    constructor() {
        this.express = express();
        this.queueProvider = new BullQueueProvider();
        this.initialization();
    }

    private initialization(): void {
        this.middlewares();
        this.routes();
        this.database();
        this.workers();
        this.queues();
        this.defineCron();
    }

    private middlewares(): void {
        this.express.use(express.json());
        this.express.use('/admin/queues', router);
    }

    private defineCron(): void {
        cron.schedule('* * * * *', async () =>
            queueProvider.add({
                jobName: 'request students process',
                queueName: 'students-process-requester',
                opts: {
                    removeOnComplete: true
                }
            })
        );
    }

    private queues(): void {
        this.queueProvider.register({queueName: 'students-process-requester'});
        this.queueProvider.register({queueName: 'student-processor'});
        this.queueProvider.setUI();

    }

    private workers(): void {
        new Worker('students-process-requester', RequestStudentsProcessProcessor)
        new Worker('student-processor', ProcessStudentProcessor)
    }

    private routes(): void {
        this.express.use(routes);
    }

    private database(): void {
        console.log('conecting to database');
    }
}

const app = new App();
const application = app.express;
const { queueProvider } = app;

export { application, queueProvider };
