import type {BaseTask, TaskStatus} from "./consts.ts";

export const filterTaskByStatus=<T extends BaseTask>(
  tasks: T[],
  status: TaskStatus | TaskStatus[]
): T[] =>{
  const statuses = Array.isArray(status) ? status : [status];
  return tasks.filter(task => statuses.includes(task.status));
}
