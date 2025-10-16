import { apiGet, apiPost, apiPut, apiDelete } from './client';

export type ApiTask = {
  _id: string;
  title: string;
  description?: string;
  status: 'ToDo' | 'in_progress' | 'Done';
  assignee?: string;
  project: string;
};

export async function fetchTasksApi(projectId?: string): Promise<ApiTask[]> {
  const qp = projectId ? `?project=${encodeURIComponent(projectId)}` : '';
  return apiGet(`/tasks${qp}`);
}

export async function createTaskApi(data: Omit<ApiTask, '_id'>): Promise<ApiTask> {
  return apiPost('/tasks', data);
}

export async function updateTaskApi(id: string, data: Partial<ApiTask>): Promise<ApiTask> {
  return apiPut(`/tasks/${id}`, data);
}

export async function deleteTaskApi(id: string): Promise<void> {
  return apiDelete(`/tasks/${id}`);
}


