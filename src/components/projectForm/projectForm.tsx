import { useState, type FormEvent } from 'react';
import styles from './projectForm.module.scss';

interface ProjectFormProps {
  onSave: (project: { name: string }) => void;
  onCancel: () => void;
  initialProject?: { name: string };
}

const ProjectForm = ({ onSave, onCancel, initialProject }: ProjectFormProps) => {
  const [name, setName] = useState(initialProject?.name || '');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onSave({ name: name.trim() });
    }
  };

  return (
    <div className={styles["project-form-overlay"]}>
      <div className={styles["project-form"]}>
        <h3>{initialProject ? 'Редактировать проект' : 'Новый проект'}</h3>
        <form onSubmit={handleSubmit}>
          <div className={styles["form-group"]}>
            <label>Название проекта *</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Введите название проекта"
            />
          </div>

          <div className={styles["form-actions"]}>
            <button type="button" onClick={onCancel} className="btn btn-cancel">
              Отмена
            </button>
            <button type="submit" className="btn btn-primary">
              {initialProject ? 'Сохранить' : 'Создать'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProjectForm;
