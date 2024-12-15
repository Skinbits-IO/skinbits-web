import { ReactNode } from 'react';
import AccountIcon from '../icons/navigation/Account';
import HomeIcon from '../icons/navigation/Home';
import MarketplaceIcon from '../icons/navigation/Marketplace';
import ReferralsIcon from '../icons/navigation/Referrals';
import TaskIcon from '../icons/navigation/Tasks';
import styles from './NavigationBar.module.css';
import { Link, useLocation } from 'react-router';
import React from 'react';

function NavigationBar() {
  const links: { href: string; icon: ReactNode }[] = [
    { href: '/marketplace', icon: <MarketplaceIcon /> },
    { href: '/task', icon: <TaskIcon /> },
    { href: '/', icon: <HomeIcon /> },
    { href: '/referrals', icon: <ReferralsIcon /> },
    { href: '/account', icon: <AccountIcon /> },
  ];

  const { pathname } = useLocation();

  return (
    <nav className={styles.background}>
      {links.map((value, key) => {
        const isActive = pathname === value.href;
        return (
          <Link
            key={key}
            to={value.href}
            className={`${styles.item} ${isActive ? styles.itemActive : ''}`}
          >
            {React.cloneElement(value.icon as JSX.Element, {
              className: isActive ? styles.iconActive : styles.icon,
            })}
          </Link>
        );
      })}
    </nav>
  );
}

export default NavigationBar;
