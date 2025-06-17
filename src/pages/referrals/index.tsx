import { CopyIcon, StandardButton } from '../../components';
import styles from './ReferralsPage.module.css';
import { Steps } from './UI';

export const ReferralsPage = () => {
  return (
    <div className={styles.background}>
      <img
        className={styles.spheres}
        src={window.location.origin + '/skinbits-web/referrals.png'}
        alt="image"
      />
      <div className={styles.shadow} />
      <div className={styles.content}>
        <div className={styles.mainContent}>
          <h1 className={styles.header}>
            Invite friends <br /> Earn points
          </h1>
          <Steps />
        </div>
        <div className={styles.buttons}>
          <StandardButton text="Invite fren" onClick={() => {}} />
          <button className={styles.copyButton}>
            Copy link
            <CopyIcon />
          </button>
        </div>
      </div>
    </div>
  );
};
