import React, {useState} from 'react';
import styles from'./taskCard.module.scss';
import {type BaseTask, TaskStatus} from "../../utils/consts.ts";

type TaskCardProps = {
   task: BaseTask,
   onUpdate: (task: BaseTask) => void,
   onDelete?: () => void,
   onEdit?: () => void,
}

const TaskCard = ({ task, onUpdate, onDelete, onEdit }:TaskCardProps) => {
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

  const handleEdit = () => {
    if (onEdit) {
      onEdit();
    } else {
      setIsEditing(true);
    }
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onDelete) {
      onDelete();
    }
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
          <button onClick={handleSave} className="btn btn-success btn-sm">Сохранить</button>
          <button onClick={handleCancel} className="btn btn-cancel btn-sm">Отмена</button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={styles["task-card"]}
      draggable
      onDragStart={handleDragStart}
      onClick={handleEdit}
    >
      <div className={styles["task-header"]}>
        <h4 className={styles["task-title"]}>{task.title}</h4>
        {onDelete && (
          <button 
            className="btn btn-danger btn-icon btn-sm" 
            onClick={handleDelete}
            title="Удалить задачу"
          >
            ×
          </button>
        )}
      </div>
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