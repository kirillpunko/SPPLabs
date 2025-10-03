import React, {
  type FormEvent,
  useState
} from 'react';
import styles from './taskForm.module.scss';
import {type BaseTask, TaskStatus} from "../../utils/consts.ts";
import {generateID} from "../../utils/idGenerator.ts";

type TaskFormType = {
  onSave: (task:BaseTask)=>void,
  onCancel: ()=>void,
  initialTask: BaseTask|null,
};

const TaskForm = ({ onSave, onCancel, initialTask = null }:TaskFormType) => {
  const [task, setTask] = useState<BaseTask|null>(initialTask);

  const handleSubmit = (e:FormEvent) => {
    e.preventDefault();
    if (task?.title.trim()) {
      onSave({
        ...task,
        id: initialTask ? initialTask.id : generateID()
      });
    }
  };

  const onStatusChange = (task:BaseTask|null, e: React.ChangeEvent<HTMLSelectElement>)=>{
    console.log(e.target.value)
    setTask({ ...task, status: e.target.value }as BaseTask)
  }

  return (
    <div className={styles["task-form-overlay"]}>
      <div className={styles["task-form"]}>
        <h3>{initialTask ? 'Редактировать задачу' : 'Новая задача'}</h3>
        <form onSubmit={handleSubmit}>
          <div className={styles["form-group"]}>
            <label>Название задачи *</label>
            <input
              type="text"
              value={task?.title||""}
              onChange={(e) => setTask({ ...task, title: e.target.value } as BaseTask)}
              required
            />
          </div>

          <div className={styles["form-group"]}>
            <label>Описание</label>
            <textarea
              value={task?.description||""}
              onChange={(e) => setTask({ ...task, description: e.target.value } as BaseTask)}
              rows={3}
            />
          </div>

          <div className={styles["form-group"]}>
            <label>Исполнитель</label>
            <input
              type="text"
              value={task?.assignee||""}
              onChange={(e) => setTask({ ...task, assignee: e.target.value } as BaseTask)}
            />
          </div>

          <div className={styles["form-group"]}>
            <label>Статус</label>
            <select
              value={task?.status||TaskStatus.TODO}
              onChange={(e) => onStatusChange(task,e)}
            >
              <option value={TaskStatus.TODO}>To Do</option>
              <option value={TaskStatus.IN_PROGRESS}>In Progress</option>
              <option value={TaskStatus.DONE}>Done</option>
            </select>
          </div>

          <div className={styles["form-actions"]}>
            <button type="button" onClick={onCancel} className={styles["cancel-btn"]}>
              Отмена
            </button>
            <button type="submit" className={styles["save-btn"]}>
              {initialTask ? 'Сохранить' : 'Создать'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;