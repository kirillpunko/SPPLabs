import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import TaskForm from '../../components/taskForm/taskForm';
import './projectPage.module.scss';
import KanbanBoard from "../../components/canbanBoard/kanbanBoard.tsx";
import type {BaseTask, UpdatedBaseTask} from "../../utils/consts.ts";
import type { RootState, AppDispatch } from '../../store';
import { setCurrentProject, createTask, updateTask, removeTask, fetchTasks } from '../../store';
import styles from './projectPage.module.scss';

const ProjectPage = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const projects = useSelector((state: RootState) => state.app.projects);
    const currentProject = useSelector((state: RootState) => state.app.currentProject);
    const [showTaskForm, setShowTaskForm] = useState(false);
    const [editingTask, setEditingTask] = useState<BaseTask | null>(null);

    useEffect(() => {
        if (!id) return;
        const project = projects.find(p => p.id === id);
        if (project) {
            dispatch(setCurrentProject(project));
        }
    }, [id, projects, dispatch]);

    // fetch tasks once per project id
    const lastFetchedId = useRef<string | null>(null);
    useEffect(() => {
        if (!currentProject) return;
        if (lastFetchedId.current === currentProject.id) return;
        lastFetchedId.current = currentProject.id;
        dispatch(fetchTasks(currentProject.id));
    }, [currentProject, dispatch]);

    const handleAddTask = () => {
        setEditingTask(null);
        setShowTaskForm(true);
    };

    const handleEditTask = (task: BaseTask) => {
        setEditingTask(task);
        setShowTaskForm(true);
    };

    const handleSaveTask = (taskData: BaseTask) => {
        if (!currentProject) return;

        if (editingTask) {
            dispatch(updateTask({
                projectId: currentProject.id,
                taskId: taskData.id,
                updates: taskData
            }));
        } else {
            const { id: _ignore, ...rest } = taskData as any;
            dispatch(createTask({
                projectId: currentProject.id,
                task: rest
            }));
        }

        setShowTaskForm(false);
        setEditingTask(null);
    };

    const handleTaskUpdate = (taskId: string, updates: UpdatedBaseTask) => {
        if (!currentProject) return;
        dispatch(updateTask({
            projectId: currentProject.id,
            taskId,
            updates
        }));
    };

    const handleDeleteTask = (taskId: string) => {
        if (!currentProject) return;
        if (window.confirm('Вы уверены, что хотите удалить эту задачу?')) {
            dispatch(removeTask({
                projectId: currentProject.id,
                taskId
            }));
        }
    };

    const handleCancelTask = () => {
        setShowTaskForm(false);
        setEditingTask(null);
    };

    const handleBackToProjects = () => {
        navigate('/projects');
    };

    if (!currentProject) {
        return <div>Загрузка...</div>;
    }

    return (
      <div className={styles["project-page"]}>
          <div className={styles["project-header"]}>
              <button onClick={handleBackToProjects} className="btn btn-secondary">
                  ←
              </button>
              <h1>{currentProject.name}</h1>
          </div>

          <KanbanBoard
            tasks={currentProject.tasks}
            onTaskUpdate={handleTaskUpdate}
            onAddTask={handleAddTask}
            onDeleteTask={handleDeleteTask}
            onEditTask={handleEditTask}
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