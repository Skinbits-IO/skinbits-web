import { ReactNode } from 'react';
import styles from './NavigationBar.module.css';
import { Link, useLocation } from 'react-router';
import React from 'react';
import { MarketplaceIcon } from '../icons/navigation/MarketplaceIcon';
import { RankIcon } from '../icons/navigation/RankIcon';
import { HomeIcon } from '../icons/navigation/HomeIcon';
import { ReferralsIcon } from '../icons/navigation/ReferralsIcon';
import { AccountIcon } from '../icons/navigation/AccountIcon';

export const NavigationBar = () => {
  const { pathname } = useLocation();
  const links: { href: string; icon: ReactNode }[] = [
    { href: '/marketplace', icon: <MarketplaceIcon /> },
    { href: '/ranking', icon: <RankIcon /> },
    { href: '/', icon: <HomeIcon /> },
    { href: '/referrals', icon: <ReferralsIcon /> },
    { href: '/account', icon: <AccountIcon /> },
  ];

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
};
