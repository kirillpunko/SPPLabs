import { apiGet } from './client';

export type Summary = {
  projects: number;
  totalTasks: number;
  doneTasks: number;
};

export type ProjectOverview = {
  _id: string;
  name: string;
  totalTasks: number;
  doneTasks: number;
};

export function fetchSummary() {
  return apiGet<Summary>('/stats/summary');
}

export function fetchProjectsOverview() {
  return apiGet<ProjectOverview[]>('/stats/projects-overview');
}


