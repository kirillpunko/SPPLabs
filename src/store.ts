import {configureStore, createSlice, type PayloadAction} from "@reduxjs/toolkit";
import type {Project, BaseTask, UpdatedBaseTask} from "./utils/consts";

// Начальные данные
const initialProjects: Project[] = [
  {
    id: 1,
    name: 'Веб-приложение',
    tasks: [
      {
        id: '1',
        title: 'Дизайн интерфейса',
        description: 'Создать макеты основных страниц',
        assignee: 'Алексей',
        status: 'ToDo' as any
      },
      {
        id: '2',
        title: 'Настройка роутинга',
        description: 'Реализовать навигацию между страницами',
        assignee: 'Мария',
        status: 'in_progress' as any
      },
      {
        id: '3',
        title: 'API интеграция',
        description: 'Подключить бэкенд сервисы',
        assignee: 'Иван',
        status: 'Done' as any
      }
    ]
  },
  {
    id: 2,
    name: 'Мобильное приложение',
    tasks: [
      {
        id: '4',
        title: 'Прототип навигации',
        description: 'Создать базовую структуру экранов',
        assignee: 'Ольга',
        status: 'ToDo' as any
      }
    ]
  }
];

interface AppState {
  projects: Project[];
  currentProject: Project | null;
}

const initialState: AppState = {
  projects: initialProjects,
  currentProject: null
};

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
    deleteProject: (state, action: PayloadAction<number>) => {
      state.projects = state.projects.filter(p => p.id !== action.payload);
      if (state.currentProject?.id === action.payload) {
        state.currentProject = null;
      }
    },
    updateTask: (state, action: PayloadAction<{projectId: number, taskId: string, updates: UpdatedBaseTask}>) => {
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
    addTask: (state, action: PayloadAction<{projectId: number, task: BaseTask}>) => {
      const {projectId, task} = action.payload;
      const project = state.projects.find(p => p.id === projectId);
      if (project) {
        project.tasks.push(task);
        if (state.currentProject?.id === projectId) {
          state.currentProject = {...project};
        }
      }
    },
    deleteTask: (state, action: PayloadAction<{projectId: number, taskId: string}>) => {
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
});

export const {
  setCurrentProject,
  updateProject,
  addProject,
  deleteProject,
  updateTask,
  addTask,
  deleteTask
} = appSlice.actions;

const store = configureStore({
  reducer: {
    app: appSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;