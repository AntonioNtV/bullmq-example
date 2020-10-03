import express from 'express';
import { BullQueueProvider } from './providers/Queue/implementations/BullQueueProvider';
import { IQueueProvider } from './providers/Queue/IQueueProvider';
import routes from './routes/index';
import cron from 'node-cron'
import { router } from 'bull-board';
import RequestStudentsProcessProcessor from './workers/RequestStudentProcess/RequestStudentsProcessProcessor';
import { Worker } from 'bullmq';
import ProcessStudentProcessor from './workers/ProcessStudent/ProcessStudentProcessor';
import mongoose from 'mongoose';
import Students from './models/Students';

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

    private async database(): Promise<void> {
        await mongoose.connect(
            'mongodb+srv://PUT_YOUR_USER_HERE:PUT_YOUR_PASSWORD_HERE@PUT_YOUR_HOST_HERE/PUT_YOUR_DATABASE_HERE',
            {
              useNewUrlParser: true,
              useUnifiedTopology: true,
              useCreateIndex: true
            }
        )

        mongoose.connection.on('conected', () => console.log('Database connected'))
    }

    private async insertUsers(): Promise<void> {
        await Students.create({
            description: 'Software Engineer',
            name: 'Antonio',
            surname: 'Bertino'
        })

        await Students.create({
            description: 'Frontend Developer',
            name: 'Natália',
            surname: 'Salvino'
        })

        await Students.create( {
            description: 'FullStack Developer',
            name: 'Davi',
            surname: 'Sousa'
        })

    }
}

const app = new App();
const application = app.express;
const { queueProvider } = app;

export { application, queueProvider };
