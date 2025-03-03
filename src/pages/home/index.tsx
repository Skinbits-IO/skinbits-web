import styles from './HomePage.module.css';
import { Header } from './UI/header';
import { Rank } from './UI/rank';
import { Wallet } from './UI/wallet';
import { GameWidget } from '../../features';
import { FarmButton } from './UI/farm-button';
import { useSelector } from 'react-redux';
import { RootState } from '../../state/store';
import { useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { addUserPostData } from './api/userApi';

export const HomePage = () => {
  const user = useSelector((state: RootState) => state.user);
  const mutation = useMutation({
    mutationFn: addUserPostData,
    onSuccess: (data) => {
      console.log('Post successful:', data);
    },
    onError: (error) => {
      console.error('Post failed:', error);
    },
  });

  useEffect(() => {
    mutation.mutate({
      telegramId: 'fsf',
      firstName: 'ff',
      lastName: 'ggg',
      username: 'ttt',
      languageCode: 'rrr',
      isPremium: true,
      photoUrl: 'yyy',
    });
  }, []);

  return (
    <div className={styles.background}>
      <div className={styles.header}>
        <Header name={user.name} photoUrl={user.photoUrl} />
        <div className={styles.upperSection}>
          <Rank rank={user.rank} />
          <Wallet balance={user.balance} />
        </div>
      </div>
      <div className={styles.game}>
        <GameWidget />
        <FarmButton
          progress={100 * ((user.tapLevel + user.fuelLevel) / 10)}
          status="unavailable"
        />
      </div>
    </div>
  );
};
