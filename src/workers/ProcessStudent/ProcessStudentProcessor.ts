import { Job } from 'bullmq';

const processStudentProcessor = async (job: Job<StudentJob>) => {
    const { message, name } = job.data;

    console.log(`Student ${name} currently working as ${message}`);


}

export default processStudentProcessor
