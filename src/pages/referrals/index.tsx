import { useQuery } from '@tanstack/react-query';
import { StandardButton } from '../../components';
import { getReferrals } from './api';
import { useReferralLink } from './hooks';
import styles from './ReferralsPage.module.css';
import { Referral, Steps } from './UI';
import { useUser } from '../../shared';
import { useEffect } from 'react';

export const ReferralsPage = () => {
  const { mutate: generateLink } = useReferralLink();
  const { user } = useUser();

  const { data: referrals, isPending } = useQuery({
    queryKey: ['referrals'],
    queryFn: () => getReferrals(user!.telegramId),
    retry: 0,
    staleTime: Infinity,
  });

  useEffect(() => {
    console.log(referrals);
  }, [referrals, isPending]);

  return (
    <div className={styles.background}>
      <img
        className={styles.spheres}
        src={`${window.location.origin}/referrals.png`}
        alt="referral illustration"
      />
      <div className={styles.shadow} />
      <div className={styles.content}>
        <div className={styles.mainContent}>
          <h1 className={styles.header}>
            Invite friends <br /> Earn points
          </h1>
          {isPending ? (
            <div className={styles.centerContainer}>
              <span className={styles.loader} />
            </div>
          ) : referrals && referrals.length > 0 ? (
            <div className={styles.referralContainer}>
              <h6>You referrals:</h6>
              <div className={styles.referrals}>
                {referrals.map((value, index) => {
                  return (
                    <Referral
                      key={index}
                      username={value.referredUser.username + 'fiosfiosjifjs'}
                      photoUrl={value.referredUser.photoUrl}
                    />
                  );
                })}
              </div>
            </div>
          ) : (
            <Steps />
          )}
        </div>
        <StandardButton text="Invite fren" onClick={() => generateLink()} />
      </div>
    </div>
  );
};
