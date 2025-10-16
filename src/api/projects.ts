import { apiGet, apiPost, apiPut, apiDelete } from './client';

export type ApiProject = {
  _id: string;
  name: string;
  description?: string;
  totalTasks?: number;
  todoCount?: number;
  inProgressCount?: number;
  doneCount?: number;
};

export async function fetchProjectsApi(): Promise<ApiProject[]> {
  return apiGet('/projects');
}

export async function createProjectApi(data: { name: string; description?: string }): Promise<ApiProject> {
  return apiPost('/projects', data);
}

export async function updateProjectApi(id: string, data: Partial<ApiProject>): Promise<ApiProject> {
  return apiPut(`/projects/${id}`, data);
}

export async function deleteProjectApi(id: string): Promise<void> {
  return apiDelete(`/projects/${id}`);
}


