import React, {useState} from 'react';
import styles from'./taskCard.module.scss';
import {type BaseTask, TaskStatus} from "../../utils/consts.ts";


type TaskCardProps = {
   task: BaseTask,
   onUpdate: (task: BaseTask,) => void,
 }
const TaskCard = ({ task, onUpdate }:TaskCardProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(task);

  const handleDragStart = (e:React.DragEvent) => {
    e.dataTransfer.setData('taskId', task.id);
  };

  const handleSave = () => {
    onUpdate(editedTask);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedTask(task);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className={styles["task-card editing"]}>
        <input
          type="text"
          value={editedTask.title}
          onChange={(e) => setEditedTask({ ...editedTask, title: e.target.value })}
          className={styles["edit-input"]}
        />
        <textarea
          value={editedTask.description}
          onChange={(e) => setEditedTask({ ...editedTask, description: e.target.value })}
          className={styles["edit-textarea"]}
        />
        <input
          type="text"
          value={editedTask.assignee}
          onChange={(e) => setEditedTask({ ...editedTask, assignee: e.target.value })}
          className={styles["edit-input"]}
          placeholder="Исполнитель"
        />
        <div className={styles["edit-actions"]}>
          <button onClick={handleSave} className={styles["save-btn"]}>Сохранить</button>
          <button onClick={handleCancel} className={styles["cancel-btn"]}>Отмена</button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={styles["task-card"]}
      draggable
      onDragStart={handleDragStart}
      onClick={() => setIsEditing(true)}
    >
      <h4 className={styles["task-title"]}>{task.title}</h4>
      <p className={styles["task-description"]}>{task.description}</p>
      <div className={styles["task-footer"]}>
        <span className={styles["task-assignee"]}>{task.assignee}</span>
        <span className={styles[`task-status ${task.status}`]}>
          {task.status === TaskStatus.TODO && 'To Do'}
          {task.status === TaskStatus.IN_PROGRESS && 'In Progress'}
          {task.status === TaskStatus.DONE && 'Done'}
        </span>
      </div>
    </div>
  );
};

export default TaskCard;