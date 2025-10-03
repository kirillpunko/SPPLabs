import ProjectCard from "../projectCard/projectCard";
import styles from'./projectList.module.scss';
import type {Project} from "../../utils/consts.ts";

type ProjectList = {
  projects: Project[],
  onProjectClick: (id:number) => void,
}

const ProjectList = ({ projects, onProjectClick }:ProjectList) => {
  return (
    <div className={styles["project-list"]}>
      <h1>Мои проекты</h1>
      <div className={styles["projects-grid"]}>
        {projects.map(project => (
          <ProjectCard
            key={project.id}
            project={project}
            onClick={() => onProjectClick(project.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default ProjectList;