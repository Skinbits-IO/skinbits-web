import { NotificationWidget } from '../../../../features';
import styles from './Header.module.css';

interface HeaderProps {
  avatarUrl: string;
  username: string | null;
}

export const Header = (props: HeaderProps) => {
  return (
    <div className={styles.background}>
      <div className={styles.greeting}>
        <img className={styles.avatar} src={props.avatarUrl} />
        <h6 className={styles.text}>Hi, {props.username ?? 'unknown'} 👋</h6>
      </div>
      <NotificationWidget />
    </div>
  );
};
