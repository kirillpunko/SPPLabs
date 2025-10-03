import styles from './projectCard.module.scss';
import {type Project, TaskStatus} from "../../utils/consts.ts";
import {filterTaskByStatus} from "../../utils/taskFilters.ts";

type ProjectCard = {
  project: Project,
  onClick: () => void,
}

const ProjectCard = ({ project, onClick }:ProjectCard) => {
  const totalTasks = project.tasks ? project.tasks.length : 0;

  return (
    <div className={styles["project-card"]} onClick={onClick}>
      <h3 className={styles["project-title"]}>{project.name}</h3>
      <div className={styles["project-info"]}>
        <span className={styles["task-count"]}>Задач: {totalTasks}</span>
      </div>
      <div className={styles["project-status"]}>
        <div className={styles["status-item"]}>
          <span className={styles["status-dot todo"]}></span>
          ToDo: {project.tasks ? filterTaskByStatus(project.tasks, TaskStatus.TODO).length : 0}
        </div>
        <div className={styles["status-item"]}>
          <span className={styles["status-dot in-progress"]}></span>
          In Progress: {project.tasks ? filterTaskByStatus(project.tasks, TaskStatus.IN_PROGRESS).length : 0}
        </div>
        <div className={styles["status-item"]}>
          <span className={styles["status-dot done"]}></span>
          Done: {project.tasks ? filterTaskByStatus(project.tasks, TaskStatus.DONE).length : 0}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;