// @ts-ignore
export enum TaskStatus {
    PENDING = 'pending',
    IN_PROGRESS = 'in_progress',
    COMPLETED = 'completed',
    CANCELLED = 'cancelled'
}

export interface BaseTask {
    id: string;
    title: string;
    description: string;
    status: TaskStatus;
    dueDate?: Date;
    createdAt: Date;
    updatedAt: Date;
}

export const filterTaskByStatus=<T extends BaseTask>(
    tasks: T[],
    status: TaskStatus | TaskStatus[]
): T[] =>{
    const statuses = Array.isArray(status) ? status : [status];
    return tasks.filter(task => statuses.includes(task.status));
}
