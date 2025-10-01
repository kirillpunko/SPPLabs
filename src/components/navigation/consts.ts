interface NavigationItem {
  id: string;
  label: string;
  path: string;
}
export const navigationItems: NavigationItem[] = [
  { id: 'home', label: 'Главная', path: '/' },
  { id: 'projects', label: 'Проекты', path: '/projects' },
  { id: 'profile', label: 'Профиль', path: '/profile' }
];