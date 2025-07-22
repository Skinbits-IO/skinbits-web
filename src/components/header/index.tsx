import { ReactElement } from 'react';
import styles from './Header.module.css';
import { NotificationIcon } from '../icons/NotificationIcon';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import { setNotificationShow } from '../../store/slices/notificationSlice';
import { useUser } from '../../shared';

interface IHeaderProps {
  children?: ReactElement;
}

export const Header = ({ children }: IHeaderProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useUser();
  const url =
    user!.photoUrl ?? window.location.origin + '/skinbits-web/avatar.jpg';

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
        <button
          className={styles.button}
          onClick={() => dispatch(setNotificationShow(true))}
        >
          <div className={styles.circle} />
          <NotificationIcon size={24} color="#8A8A8A" />
        </button>
      </div>
    </div>
  );
};
