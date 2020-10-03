interface addJobRequest {
    queueName: string
    jobName: string
    job: IStudentRequest
}

interface registerQueueRequest {
    queueName: string
}

interface IQueueProvider {
    register({ queueName }: registerQueueRequest): void
    add({ queueName, job, jobName }: addJobRequest): void
}

export { IQueueProvider, addJobRequest, registerQueueRequest }
