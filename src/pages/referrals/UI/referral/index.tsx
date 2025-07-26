import { RocketIcon } from '../../../../components';
import { useUser } from '../../../../shared';
import styles from './Referral.module.css';

export const Referral = () => {
  const { user } = useUser();

  const url =
    user!.photoUrl ?? window.location.origin + '/skinbits-web/avatar.jpg';
  const formatedPrice = new Intl.NumberFormat('en-US').format(user!.balance);

  return (
    <div className={styles.background}>
      <div className={styles.profile}>
        <img className={styles.avatar} src={url} alt="image" />
        <h6 className={styles.text}>
          {user!.username === '' ? user!.firstName : user!.username}
        </h6>
      </div>
      <div className={styles.priceContainer}>
        <RocketIcon size={19} color="#D2F7B6" />
        <p className={styles.price}>{formatedPrice}</p>
      </div>
    </div>
  );
};
