export interface BaseTask {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  assignee:string;
  dueDate?: Date;
}
export interface UpdatedBaseTask {
  id?: string;
  title?: string;
  description?: string;
  status?: TaskStatus;
  assignee?:string;
  dueDate?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}
export interface Project {
  id: string; 
  name: string;
  tasks: BaseTask[]
  totalTasks?: number;
  todoCount?: number;
  inProgressCount?: number;
  doneCount?: number;
}

// @ts-ignore
export enum TaskStatus {
  TODO = 'ToDo',
  IN_PROGRESS = 'in_progress',
  DONE = 'Done',
}
