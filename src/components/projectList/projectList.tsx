import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ProjectCard from "../projectCard/projectCard";
import ProjectForm from "../projectForm/projectForm";
import styles from'./projectList.module.scss';
import type {Project} from "../../utils/consts.ts";
import type { RootState, AppDispatch } from '../../store';
import { addProject } from '../../store';
import { generateProjectId } from '../../utils/idGenerator';

const ProjectList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const projects = useSelector((state: RootState) => state.app.projects);
  const [showProjectForm, setShowProjectForm] = useState(false);

  const handleProjectClick = (projectId: number) => {
    navigate(`/projects/${projectId}`);
  };

  const handleAddProject = () => {
    setShowProjectForm(true);
  };

  const handleSaveProject = (projectData: { name: string }) => {
    const newProject: Project = {
      id: generateProjectId(),
      name: projectData.name,
      tasks: []
    };
    dispatch(addProject(newProject));
    setShowProjectForm(false);
  };

  const handleCancelProject = () => {
    setShowProjectForm(false);
  };

  return (
    <div className={styles["project-list"]}>
      <div className={styles["project-list-header"]}>
        <h1>Мои проекты</h1>
        <button 
          className="btn btn-primary" 
          onClick={handleAddProject}
        >
          + Создать проект
        </button>
      </div>
      
      <div className={styles["projects-grid"]}>
        {projects.map(project => (
          <ProjectCard
            key={project.id}
            project={project}
            onClick={() => handleProjectClick(project.id)}
          />
        ))}
      </div>

      {showProjectForm && (
        <ProjectForm
          onSave={handleSaveProject}
          onCancel={handleCancelProject}
        />
      )}
    </div>
  );
};

export default ProjectList;