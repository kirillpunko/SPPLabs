import TaskCard from '../taskCard/taskCard';
import styles from './kanbanBoard.module.scss';
import {type BaseTask, TaskStatus, type UpdatedBaseTask} from "../../utils/consts.ts";
import {filterTaskByStatus} from "../../utils/taskFilters.ts";
import React from "react";

type kanbanType = {
  tasks: BaseTask[],
  onTaskUpdate: (taskId:string, task: UpdatedBaseTask ) => void,
  onAddTask: () => void,
}

const KanbanBoard = ({ tasks, onTaskUpdate, onAddTask }:kanbanType) => {
  const columns = [
    { id: 'ToDo', title: 'To Do', tasks: filterTaskByStatus(tasks, TaskStatus.TODO) },
    { id: 'in_progress', title: 'In Progress', tasks: filterTaskByStatus(tasks, TaskStatus.IN_PROGRESS) },
    { id: 'Done', title: 'Done', tasks: filterTaskByStatus(tasks, TaskStatus.DONE) }
  ];

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e:React.DragEvent, statusId:string) => {
    let status = TaskStatus.TODO
    if (statusId === TaskStatus.IN_PROGRESS) { status = TaskStatus.IN_PROGRESS}
    if (statusId === TaskStatus.DONE) { status = TaskStatus.DONE}
    e.preventDefault();
    if(e.dataTransfer){
      const taskId = e.dataTransfer.getData('taskId');
      onTaskUpdate(taskId, { status });
    }
  };

  return (
    <div className={styles["kanban-board"]}>
      <div className={styles["board-header"]}>
        <h2>Kanban Доска</h2>
        <button className={styles["add-task-btn"]} onClick={onAddTask}>
          + Добавить задачу
        </button>
      </div>

      <div className={styles["columns-container"]}>
        {columns.map(column => (
          <div
            key={column.id}
            className={styles["kanban-column"]}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, column.id)}
          >
            <div className={styles["column-header"]}>
              <h3>{column.title}</h3>
              <span className={styles["task-count"]}>{column.tasks.length}</span>
            </div>
            <div className={styles["tasks-list"]}>
              {column.tasks.map(task => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onUpdate={(updates: BaseTask) => onTaskUpdate(task.id, updates)}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KanbanBoard;