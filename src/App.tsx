import './App.scss'
import {Navigation} from "./components/navigation/navigation.tsx";
import {useState} from "react";
import ProjectPage from "./pages/projectPage/projectPage.tsx";
import ProjectList from "./components/projectList/projectList.tsx";
import {type Project, TaskStatus} from "./utils/consts.ts";

// Начальные данные
const initialProjects: Project[] = [
  {
    id: 1,
    name: 'Веб-приложение',
    tasks: [
      {
        id: '1',
        title: 'Дизайн интерфейса',
        description: 'Создать макеты основных страниц',
        assignee: 'Алексей',
        status: TaskStatus.TODO
      },
      {
        id: '2',
        title: 'Настройка роутинга',
        description: 'Реализовать навигацию между страницами',
        assignee: 'Мария',
        status: TaskStatus.IN_PROGRESS
      },
      {
        id: '3',
        title: 'API интеграция',
        description: 'Подключить бэкенд сервисы',
        assignee: 'Иван',
        status: TaskStatus.DONE
      }
    ]
  },
  {
    id: 2,
    name: 'Мобильное приложение',
    tasks: [
      {
        id: '4',
        title: 'Прототип навигации',
        description: 'Создать базовую структуру экранов',
        assignee: 'Ольга',
        status: TaskStatus.TODO
      }
    ]
  }
];

function App() {

  const [projects, setProjects] = useState(initialProjects);
  const [currentProject, setCurrentProject] = useState<Project|null>(null);

  const handleProjectClick = (projectId: number) => {
    const project = projects.find(p => p.id === projectId);
    setCurrentProject(project||null);
  };

  const handleBackToProjects = () => {
    setCurrentProject(null);
  };

  const handleUpdateProject = (updatedProject: Project) => {
    setProjects(projects.map(p =>
      p.id === updatedProject.id ? updatedProject : p
    ));
    setCurrentProject(updatedProject);
  };
  return (
    <div>
      <Navigation/>
      {currentProject ? (
        <ProjectPage
          project={currentProject}
          onUpdateProject={handleUpdateProject}
          onBack={handleBackToProjects}
        />
      ) : (
        <ProjectList
          projects={projects}
          onProjectClick={handleProjectClick}
        />
      )}
    </div>
  )
}

export default App
