import { useState } from 'react';
import styles from './navigation.module.scss';
import { navigationItems} from "./consts.ts";

export const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className={styles.navigation}>

      <div className={styles.desktopMenu}>
        <ul className={styles.list}>
          {navigationItems.map((item) => (
            <li key={item.id} className={styles.item}>
              <a href={item.path} className={styles.link}>
                {item.label}
              </a>
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
                <a
                  href={item.path}
                  className={styles.mobileLink}
                  onClick={closeMenu}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};