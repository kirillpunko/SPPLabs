
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import type { RootState } from '../../store';
import styles from './mainPage.module.scss';

const MainPage = () => {
    const projects = useSelector((state: RootState) => state.app.projects);
    const totalTasks = projects.reduce((sum, project) => sum + project.tasks.length, 0);
    const completedTasks = projects.reduce((sum, project) => 
        sum + project.tasks.filter(task => task.status === 'Done').length, 0
    );

    return (
        <div className={styles["main-page"]}>
            <div className={styles["hero-section"]}>
                <h1>Добро пожаловать в систему управления проектами</h1>
                <p>Организуйте свои задачи и проекты эффективно</p>
            </div>

            <div className={styles["stats-section"]}>
                <div className={styles["stat-card"]}>
                    <h3>Проекты</h3>
                    <p className={styles["stat-number"]}>{projects.length}</p>
                    <Link to="/projects" className="btn btn-outline btn-outline-primary">
                        Управлять проектами
                    </Link>
                </div>
                
                <div className={styles["stat-card"]}>
                    <h3>Всего задач</h3>
                    <p className={styles["stat-number"]}>{totalTasks}</p>
                </div>
                
                <div className={styles["stat-card"]}>
                    <h3>Выполнено</h3>
                    <p className={styles["stat-number"]}>{completedTasks}</p>
                </div>
            </div>
        </div>
    );
};

export default MainPage;