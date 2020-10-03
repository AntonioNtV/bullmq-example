import { Job } from 'bullmq';
import { queueProvider } from '../../app';
import { students } from '../../data/StudentsData';

const requestStudentsProcessProcessor =  async (job: Job) => {
    for (const student of students) {
        console.log(`Request student ${student.name} process`);

        queueProvider.add({
            job: {
                message: student.description,
                name: student.name
            },
            jobName: `${student.name} process request`,
            queueName: 'student-processor'
        })
    }
}

export default requestStudentsProcessProcessor
