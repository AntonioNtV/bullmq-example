import { Job } from 'bullmq';
import { queueProvider } from '../../app';
import Students from '../../models/Students';

const requestStudentsProcessProcessor =  async (job: Job) => {

    const students = await Students.find({})

    for (const student of students) {
        console.log(`Request student ${student.name} process`);

        queueProvider.add({
            job: {
                message: student.description,
                name: student.name
            },
            jobName: `${student.name} process request`,
            queueName: 'student-processor',
            opts: {
                removeOnComplete: true
            }
        })
    }
}

export default requestStudentsProcessProcessor
