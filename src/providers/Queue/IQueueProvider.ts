interface addJobRequest {
    queueName: string
    jobName: string
    job?: IStudentRequest,
    opts?: {
        removeOnComplete: boolean
    }
}

interface registerQueueRequest {
    queueName: string
}

interface IQueueProvider {
    register({ queueName }: registerQueueRequest): void
    add({ queueName, job, jobName, opts }: addJobRequest): void
    setUI(): void
}

export { IQueueProvider, addJobRequest, registerQueueRequest }
