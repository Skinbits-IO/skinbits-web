import { RocketIcon } from '../../../../components';
import styles from './Referral.module.css';

interface IReferralProps {
  username: string | null;
  photoUrl: string | null;
}

export const Referral = ({ username, photoUrl }: IReferralProps) => {
  const url = photoUrl ?? window.location.origin + '/skinbits-web/avatar.jpg';
  const formatedPrice = new Intl.NumberFormat('en-US').format(1e6);

  return (
    <div className={styles.background}>
      <div className={styles.profile}>
        <img className={styles.avatar} src={url} alt="image" />
        <h6 className={styles.text}>{username ?? ''}</h6>
      </div>
      <div className={styles.priceContainer}>
        <RocketIcon size={19} color="#D2F7B6" />
        <p className={styles.price}>{formatedPrice}</p>
      </div>
    </div>
  );
};
