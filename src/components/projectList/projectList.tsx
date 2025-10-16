import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ProjectCard from "../projectCard/projectCard";
import ProjectForm from "../projectForm/projectForm";
import styles from'./projectList.module.scss';
import type { RootState, AppDispatch } from '../../store';
import { createProject, fetchProjects } from '../../store';

const ProjectList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const projects = useSelector((state: RootState) => state.app.projects);
  const [showProjectForm, setShowProjectForm] = useState(false);

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  const handleProjectClick = (projectId: string) => {
    navigate(`/projects/${projectId}`);
  };

  const handleAddProject = () => {
    setShowProjectForm(true);
  };

  const handleSaveProject = (projectData: { name: string }) => {
    dispatch(createProject({ name: projectData.name }));
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