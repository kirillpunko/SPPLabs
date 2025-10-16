
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../../store';
import type { AppDispatch } from '../../store';
import { fetchSummaryThunk, fetchProjectsOverviewThunk } from '../../store';
import styles from './profilePage.module.scss';

const ProfilePage = () => {
    const dispatch = useDispatch<AppDispatch>();
    const summary = useSelector((state: RootState) => state.app.summary);
    const overview = useSelector((state: RootState) => state.app.projectsOverview) || [];
    useEffect(() => {
        if (!summary) dispatch(fetchSummaryThunk());
        if (!overview.length) dispatch(fetchProjectsOverviewThunk());
    }, [dispatch]);

    return (
        <div className={styles["profile-page"]}>
            <h1>Профиль пользователя</h1>
            
            <div className={styles["profile-stats"]}>
                <div className={styles["stat-card"]}>
                    <h3>Всего проектов</h3>
                    <p className={styles["stat-number"]}>{summary?.projects ?? 0}</p>
                </div>
                
                <div className={styles["stat-card"]}>
                    <h3>Всего задач</h3>
                    <p className={styles["stat-number"]}>{summary?.totalTasks ?? 0}</p>
                </div>
                
                <div className={styles["stat-card"]}>
                    <h3>Выполнено задач</h3>
                    <p className={styles["stat-number"]}>{summary?.doneTasks ?? 0}</p>
                </div>
                
                <div className={styles["stat-card"]}>
                    <h3>Прогресс</h3>
                    <p className={styles["stat-number"]}>
                        {summary && summary.totalTasks > 0 ? Math.round((summary.doneTasks / summary.totalTasks) * 100) : 0}%
                    </p>
                </div>
            </div>

            <div className={styles["projects-overview"]}>
                <h2>Обзор проектов</h2>
                {overview.length === 0 ? (
                    <p>У вас пока нет проектов</p>
                ) : (
                    <div className={styles["projects-list"]}>
                        {overview.map(p => {
                            const progress = p.totalTasks > 0 ? Math.round((p.doneTasks / p.totalTasks) * 100) : 0;
                            return (
                                <div key={p.id} className={styles["project-item"]}>
                                    <h4>{p.name}</h4>
                                    <p>Задач: {p.totalTasks}</p>
                                    <p>Выполнено: {p.doneTasks}</p>
                                    <div className={styles["progress-bar"]}>
                                        <div 
                                            className={styles["progress-fill"]}
                                            style={{ width: `${progress}%` }}
                                        ></div>
                                    </div>
                                    <p>Прогресс: {progress}%</p>
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