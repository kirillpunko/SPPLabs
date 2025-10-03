import { useState } from 'react';
import TaskForm from '../../components/taskForm/taskForm';
import './projectPage.module.scss';
import KanbanBoard from "../../components/canbanBoard/kanbanBoard.tsx";
import type {BaseTask, Project, UpdatedBaseTask} from "../../utils/consts.ts";

type projectPage = {
    project: Project,
    onUpdateProject: (project: Project) => void,
    onBack: ()=> void,
}

const ProjectPage = ({ project, onUpdateProject, onBack }:projectPage) => {
    const [showTaskForm, setShowTaskForm] = useState(false);
    const [editingTask, setEditingTask] = useState(null);

    const handleAddTask = () => {
        setEditingTask(null);
        setShowTaskForm(true);
    };

    const handleSaveTask = (taskData: BaseTask) => {
        const updatedTasks = editingTask
          ? project.tasks.map(task => task.id === taskData.id ? taskData : task)
          : [...project.tasks, taskData];

        onUpdateProject({
            ...project,
            tasks: updatedTasks
        });

        setShowTaskForm(false);
        setEditingTask(null);
    };

    const handleTaskUpdate = (taskId:string, updates: UpdatedBaseTask) => {
        const updatedTasks = project.tasks.map(task =>
          task.id === taskId ? { ...task, ...updates } : task
        );

        onUpdateProject({
            ...project,
            tasks: updatedTasks
        });
    };

    const handleCancelTask = () => {
        setShowTaskForm(false);
        setEditingTask(null);
    };

    return (
      <div className="project-page">
          <div className="project-header">
              <button onClick={onBack} className="back-btn">
                  ← Назад к проектам
              </button>
              <h1>{project.name}</h1>
          </div>

          <KanbanBoard
            tasks={project.tasks}
            onTaskUpdate={handleTaskUpdate}
            onAddTask={handleAddTask}
          />

          {showTaskForm && (
            <TaskForm
              onSave={handleSaveTask}
              onCancel={handleCancelTask}
              initialTask={editingTask}
            />
          )}
      </div>
    );
};

export default ProjectPage;