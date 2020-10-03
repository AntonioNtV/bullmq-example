import { Worker } from 'bullmq'
import RequestStudentsProcessProcessor from './RequestStudentsProcessProcessor'

const requestStudentsProcessWorker = new Worker('students-process-requester', RequestStudentsProcessProcessor)

export { requestStudentsProcessWorker }
