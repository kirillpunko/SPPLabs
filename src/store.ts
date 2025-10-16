import {configureStore, createSlice, type PayloadAction, createAsyncThunk} from "@reduxjs/toolkit";
import type {Project, BaseTask, UpdatedBaseTask} from "./utils/consts";
import { fetchProjectsApi, createProjectApi, deleteProjectApi } from './api/projects';
import { createTaskApi, deleteTaskApi, updateTaskApi, fetchTasksApi } from './api/tasks';
import { fetchSummary, fetchProjectsOverview } from './api/stats';

// Начальные данные
const initialProjects: Project[] = [];

interface AppState {
  projects: Project[];
  currentProject: Project | null;
  summary?: { projects: number; totalTasks: number; doneTasks: number };
  projectsOverview?: Array<{ id: string; name: string; totalTasks: number; doneTasks: number }>;
}

const initialState: AppState = {
  projects: initialProjects,
  currentProject: null,
  summary: undefined,
  projectsOverview: undefined
};

// Thunks
export const fetchProjects = createAsyncThunk('projects/fetchAll', async () => {
  const data = await fetchProjectsApi();
  const mapped: Project[] = data.map(p => ({
    id: p._id,
    name: p.name,
    tasks: [],
    totalTasks: p.totalTasks,
    todoCount: p.todoCount,
    inProgressCount: p.inProgressCount,
    doneCount: p.doneCount,
  }));
  return mapped;
});

export const fetchSummaryThunk = createAsyncThunk('stats/summary', async () => {
  return fetchSummary();
});

export const fetchProjectsOverviewThunk = createAsyncThunk('stats/projectsOverview', async () => {
  const data = await fetchProjectsOverview();
  return data.map(d => ({ id: d._id, name: d.name, totalTasks: d.totalTasks, doneTasks: d.doneTasks }));
});

export const createProject = createAsyncThunk('projects/create', async (payload: { name: string; description?: string }) => {
  const p = await createProjectApi(payload);
  return {
    id: p._id,
    name: p.name,
    tasks: [],
    totalTasks: p.totalTasks,
    todoCount: p.todoCount,
    inProgressCount: p.inProgressCount,
    doneCount: p.doneCount,
  } as Project;
});

export const removeProject = createAsyncThunk('projects/delete', async (id: string) => {
  await deleteProjectApi(id);
  return id;
});

export const createTask = createAsyncThunk('tasks/create', async (payload: { projectId: string; task: Omit<BaseTask,'id'> }) => {
  const t = await createTaskApi({ title: payload.task.title, description: payload.task.description, status: payload.task.status as any, assignee: payload.task.assignee, project: payload.projectId });
  return { projectId: payload.projectId, task: { ...payload.task, id: t._id } };
});

export const fetchTasks = createAsyncThunk('tasks/fetchByProject', async (projectId: string) => {
  const data = await fetchTasksApi(projectId);
  const tasks: BaseTask[] = data.map(t => ({
    id: t._id,
    title: t.title,
    description: t.description || '',
    assignee: t.assignee || '',
    status: t.status as any
  }));
  return { projectId, tasks };
});

export const updateTask = createAsyncThunk('tasks/update', async (payload: { projectId: string; taskId: string; updates: UpdatedBaseTask }) => {
  await updateTaskApi(payload.taskId, { ...payload.updates as any });
  return payload;
});

export const removeTask = createAsyncThunk('tasks/delete', async (payload: { projectId: string; taskId: string }) => {
  await deleteTaskApi(payload.taskId);
  return payload;
});

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setCurrentProject: (state, action: PayloadAction<Project | null>) => {
      state.currentProject = action.payload;
    },
    updateProject: (state, action: PayloadAction<Project>) => {
      const index = state.projects.findIndex(p => p.id === action.payload.id);
      if (index !== -1) {
        state.projects[index] = action.payload;
        if (state.currentProject?.id === action.payload.id) {
          state.currentProject = action.payload;
        }
      }
    },
    addProject: (state, action: PayloadAction<Project>) => {
      state.projects.push(action.payload);
    },
    deleteProject: (state, action: PayloadAction<string>) => {
      state.projects = state.projects.filter(p => p.id !== action.payload);
      if (state.currentProject?.id === action.payload) {
        state.currentProject = null;
      }
    },
    updateTaskLocal: (state, action: PayloadAction<{projectId: string, taskId: string, updates: UpdatedBaseTask}>) => {
      const {projectId, taskId, updates} = action.payload;
      const project = state.projects.find(p => p.id === projectId);
      if (project) {
        const taskIndex = project.tasks.findIndex(t => t.id === taskId);
        if (taskIndex !== -1) {
          project.tasks[taskIndex] = {...project.tasks[taskIndex], ...updates};
          if (state.currentProject?.id === projectId) {
            state.currentProject = {...project};
          }
        }
      }
    },
    addTaskLocal: (state, action: PayloadAction<{projectId: string, task: BaseTask}>) => {
      const {projectId, task} = action.payload;
      const project = state.projects.find(p => p.id === projectId);
      if (project) {
        project.tasks.push(task);
        if (state.currentProject?.id === projectId) {
          state.currentProject = {...project};
        }
      }
    },
    deleteTaskLocal: (state, action: PayloadAction<{projectId: string, taskId: string}>) => {
      const {projectId, taskId} = action.payload;
      const project = state.projects.find(p => p.id === projectId);
      if (project) {
        project.tasks = project.tasks.filter(t => t.id !== taskId);
        if (state.currentProject?.id === projectId) {
          state.currentProject = {...project};
        }
      }
    }
  }
  ,
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.projects = action.payload;
      })
      .addCase(fetchSummaryThunk.fulfilled, (state, action) => {
        state.summary = action.payload;
      })
      .addCase(fetchProjectsOverviewThunk.fulfilled, (state, action) => {
        state.projectsOverview = action.payload;
      })
      .addCase(createProject.fulfilled, (state, action) => {
        state.projects.push(action.payload);
      })
      .addCase(removeProject.fulfilled, (state, action) => {
        state.projects = state.projects.filter(p => p.id !== action.payload);
        if (state.currentProject?.id === action.payload) state.currentProject = null;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        const { projectId, task } = action.payload;
        const project = state.projects.find(p => p.id === projectId);
        if (project) project.tasks.push(task);
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const { projectId, taskId, updates } = action.payload;
        const project = state.projects.find(p => p.id === projectId);
        if (!project) return;
        const idx = project.tasks.findIndex(t => t.id === taskId);
        if (idx !== -1) project.tasks[idx] = { ...project.tasks[idx], ...updates } as BaseTask;
      })
      .addCase(removeTask.fulfilled, (state, action) => {
        const { projectId, taskId } = action.payload;
        const project = state.projects.find(p => p.id === projectId);
        if (!project) return;
        project.tasks = project.tasks.filter(t => t.id !== taskId);
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        const { projectId, tasks } = action.payload;
        const project = state.projects.find(p => p.id === projectId);
        if (project) project.tasks = tasks;
      });
  }
});

export const {
  setCurrentProject,
  updateProject,
  addProject,
  deleteProject,
  updateTaskLocal,
  addTaskLocal,
  deleteTaskLocal
} = appSlice.actions;

const store = configureStore({
  reducer: {
    app: appSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;