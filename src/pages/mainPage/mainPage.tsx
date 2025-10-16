
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import type { RootState, AppDispatch } from '../../store';
import { fetchSummaryThunk } from '../../store';
import styles from './mainPage.module.scss';

const MainPage = () => {
    const dispatch = useDispatch<AppDispatch>();
    const summary = useSelector((state: RootState) => state.app.summary);
    useEffect(() => {
        dispatch(fetchSummaryThunk());
    }, [dispatch]);

    return (
        <div className={styles["main-page"]}>
            <div className={styles["hero-section"]}>
                <h1>Добро пожаловать в систему управления проектами</h1>
                <p>Организуйте свои задачи и проекты эффективно</p>
            </div>

            <div className={styles["stats-section"]}>
                <div className={styles["stat-card"]}>
                    <h3>Проекты</h3>
                    <p className={styles["stat-number"]}>{summary?.projects ?? 0}</p>
                    <Link to="/projects" className="btn btn-outline btn-outline-primary">
                        Управлять проектами
                    </Link>
                </div>
                
                <div className={styles["stat-card"]}>
                    <h3>Всего задач</h3>
                    <p className={styles["stat-number"]}>{summary?.totalTasks ?? 0}</p>
                </div>
                
                <div className={styles["stat-card"]}>
                    <h3>Выполнено</h3>
                    <p className={styles["stat-number"]}>{summary?.doneTasks ?? 0}</p>
                </div>
            </div>
        </div>
    );
};

export default MainPage;