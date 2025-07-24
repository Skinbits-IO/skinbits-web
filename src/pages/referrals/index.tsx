import { CopyIcon, StandardButton } from '../../components';
import { useReferralLink } from './hooks';
import styles from './ReferralsPage.module.css';
import { Steps } from './UI';

export const ReferralsPage = () => {
  const { mutate: generateLink } = useReferralLink();

  return (
    <div className={styles.background}>
      <img
        className={styles.spheres}
        src={`${window.location.origin}/skinbits-web/referrals.png`}
        alt="referral illustration"
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
          <StandardButton
            text="Invite fren"
            onClick={() => generateLink({ openTG: true })}
          />
          <button
            className={styles.copyButton}
            onClick={() => generateLink({ openTG: false })}
          >
            Copy link
            <CopyIcon />
          </button>
        </div>
      </div>
    </div>
  );
};
