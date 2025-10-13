
import { useSelector } from 'react-redux';
import type { RootState } from '../../store';
import styles from './profilePage.module.scss';

const ProfilePage = () => {
    const projects = useSelector((state: RootState) => state.app.projects);
    const totalTasks = projects.reduce((sum, project) => sum + project.tasks.length, 0);
    const completedTasks = projects.reduce((sum, project) => 
        sum + project.tasks.filter(task => task.status === 'Done').length, 0
    );

    return (
        <div className={styles["profile-page"]}>
            <h1>Профиль пользователя</h1>
            
            <div className={styles["profile-stats"]}>
                <div className={styles["stat-card"]}>
                    <h3>Всего проектов</h3>
                    <p className={styles["stat-number"]}>{projects.length}</p>
                </div>
                
                <div className={styles["stat-card"]}>
                    <h3>Всего задач</h3>
                    <p className={styles["stat-number"]}>{totalTasks}</p>
                </div>
                
                <div className={styles["stat-card"]}>
                    <h3>Выполнено задач</h3>
                    <p className={styles["stat-number"]}>{completedTasks}</p>
                </div>
                
                <div className={styles["stat-card"]}>
                    <h3>Прогресс</h3>
                    <p className={styles["stat-number"]}>
                        {totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0}%
                    </p>
                </div>
            </div>

            <div className={styles["projects-overview"]}>
                <h2>Обзор проектов</h2>
                {projects.length === 0 ? (
                    <p>У вас пока нет проектов</p>
                ) : (
                    <div className={styles["projects-list"]}>
                        {projects.map(project => {
                            const projectCompletedTasks = project.tasks.filter(task => task.status === 'Done').length;
                            const projectProgress = project.tasks.length > 0 
                                ? Math.round((projectCompletedTasks / project.tasks.length) * 100) 
                                : 0;
                            
                            return (
                                <div key={project.id} className={styles["project-item"]}>
                                    <h4>{project.name}</h4>
                                    <p>Задач: {project.tasks.length}</p>
                                    <p>Выполнено: {projectCompletedTasks}</p>
                                    <div className={styles["progress-bar"]}>
                                        <div 
                                            className={styles["progress-fill"]}
                                            style={{ width: `${projectProgress}%` }}
                                        ></div>
                                    </div>
                                    <p>Прогресс: {projectProgress}%</p>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProfilePage;