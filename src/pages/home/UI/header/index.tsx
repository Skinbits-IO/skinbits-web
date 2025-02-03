import { NotificationWidget } from '../../../../features';
import styles from './Header.module.css';

interface IHeaderProps {
  name: string;
  photoUrl: string | null;
}

export const Header = ({ name, photoUrl }: IHeaderProps) => {
  const url = photoUrl ?? '/skinbits-web/avatar.png';

  return (
    <div className={styles.background}>
      <div className={styles.greeting}>
        <img
          className={styles.avatar}
          src={window.location.origin + url}
          alt="image"
        />
        <h6 className={styles.text}>Hi, {name} 👋</h6>
      </div>
      <NotificationWidget />
    </div>
  );
};
