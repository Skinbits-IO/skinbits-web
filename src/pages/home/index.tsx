import styles from './HomePage.module.css';
import { Header } from './UI/header';
import { Rank } from './UI/rank';
import { Wallet } from './UI/wallet';
import { GameWidget, NotificationWidget } from '../../features';
import { FarmButton } from './UI/farm-button';
import { useSelector } from 'react-redux';
import { RootState } from '../../state/store';
import { useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { addUserPostData } from './api/userApi';
import { AnimatePresence } from 'framer-motion';

export const HomePage = () => {
  const user = useSelector((state: RootState) => state.user);
  const mutation = useMutation({
    mutationFn: addUserPostData,
    onSuccess: (data) => {
      console.log('Post successful:', data);
    },
    onError: (error) => {
      console.error('Post failed:', error.message);
    },
  });

  const [showNotifications, setShowNotifications] = useState<boolean>(false);

  useEffect(() => {
    mutation.mutate({
      hash: 'ae8050695d65c3191a05e0cd1a0767c41b6af284e3c7c09e5a35fdc08b93ff86',
      telegramId: '1111111111',
      firstName: 'vvvvv',
      lastName: 'G',
      username: 'slavon',
      languageCode: 'EN',
      isPremium: false,
      photoUrl: '5i42-rkeo',
    });
  }, []);

  return (
    <div className={styles.background}>
      <AnimatePresence>
        {showNotifications && (
          <NotificationWidget
            key="notification-widget"
            onClose={() => setShowNotifications(false)}
          />
        )}
      </AnimatePresence>
      <div className={styles.header}>
        <Header
          name={user.name}
          photoUrl={user.photoUrl}
          onNotification={() => setShowNotifications(true)}
        />
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
