import { Worker } from 'bullmq'
import ProcessStudentProcessor from './ProcessStudentProcessor'

const processStudentWorker = new Worker('student-processor', ProcessStudentProcessor)

export { processStudentWorker }
