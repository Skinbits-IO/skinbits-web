import { ReactElement } from 'react';
import styles from './index.module.css';
import { useUser } from '../../../shared';
import { NotificationModal } from '../../notification-modal';

interface IHeaderProps {
  children?: ReactElement;
}

export const Header = ({ children }: IHeaderProps) => {
  const { user } = useUser();
  const url = user!.photoUrl ?? window.location.origin + '/avatar.jpg';

  return (
    <div className={styles.background}>
      <div className={styles.greeting}>
        <img className={styles.avatar} src={url} alt="image" />
        <h6 className={styles.text}>
          Hi, {user!.username === '' ? user!.firstName : user!.username} 👋
        </h6>
      </div>
      <div className={styles.buttons}>
        {children}
        <NotificationModal />
      </div>
    </div>
  );
};
