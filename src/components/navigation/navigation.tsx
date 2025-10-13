import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './navigation.module.scss';
import { navigationItems} from "./consts.ts";

export const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className={styles.navigation}>

      <div className={styles.desktopMenu}>
        <ul className={styles.list}>
          {navigationItems.map((item) => (
            <li key={item.id} className={styles.item}>
              <Link 
                to={item.path} 
                className={`${styles.link} ${isActive(item.path) ? styles.active : ''}`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

      </div>

      <div className={styles.mobileMenu}>
        <button
          className={`${styles.burger} ${isMenuOpen ? styles.burgerActive : ''}`}
          onClick={toggleMenu}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <div className={`${styles.mobileOverlay} ${isMenuOpen ? styles.mobileOverlayActive : ''}`} onClick={closeMenu}></div>

        <div className={`${styles.mobileContent} ${isMenuOpen ? styles.mobileContentActive : ''}`}>
          <ul className={styles.mobileList}>
            {navigationItems.map((item) => (
              <li key={item.id} className={styles.mobileItem}>
                <Link
                  to={item.path}
                  className={`${styles.mobileLink} ${isActive(item.path) ? styles.active : ''}`}
                  onClick={closeMenu}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};