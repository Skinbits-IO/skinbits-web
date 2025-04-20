import { useEffect, useState } from 'react';
import { RankUser } from '../../types';
import styles from './RankingPage.module.css';
import { RankCard } from './UI/rank-card';
import { RootState } from '../../state/store';
import { useSelector } from 'react-redux';
import { WinnerRankCard } from './UI/winner-rank-card';
import { findUserByName } from './utils/rankingUtils';

export const RankingPage = () => {
  const users: RankUser[] = [
    {
      place: 1,
      fullName: 'Germans',
      photoUrl:
        'https://i.seadn.io/gae/b91FFh2EPsExNTHHqECbEQsqDSgaBeOxYWIZfNeYdXfmBOIFPpbyB2VphB_6m_g5iu_ACtgA11X-64TsqWUtdv5x9fFzco4N7OzFYio?auto=format&dpr=1&w=1000',
      totalEarned: 1000000000,
    },
    {
      place: 2,
      fullName: 'Germans',
      photoUrl:
        'https://i.seadn.io/gae/b91FFh2EPsExNTHHqECbEQsqDSgaBeOxYWIZfNeYdXfmBOIFPpbyB2VphB_6m_g5iu_ACtgA11X-64TsqWUtdv5x9fFzco4N7OzFYio?auto=format&dpr=1&w=1000',
      totalEarned: 100000000,
    },
    {
      place: 3,
      fullName: 'Germans',
      photoUrl:
        'https://i.seadn.io/gae/b91FFh2EPsExNTHHqECbEQsqDSgaBeOxYWIZfNeYdXfmBOIFPpbyB2VphB_6m_g5iu_ACtgA11X-64TsqWUtdv5x9fFzco4N7OzFYio?auto=format&dpr=1&w=1000',
      totalEarned: 150000000,
    },
    {
      place: 4,
      fullName: 'Germans',
      photoUrl:
        'https://i.seadn.io/gae/b91FFh2EPsExNTHHqECbEQsqDSgaBeOxYWIZfNeYdXfmBOIFPpbyB2VphB_6m_g5iu_ACtgA11X-64TsqWUtdv5x9fFzco4N7OzFYio?auto=format&dpr=1&w=1000',
      totalEarned: 10000000,
    },
    {
      place: 5,
      fullName: 'Germans Prudivus',
      photoUrl:
        'https://i.seadn.io/gae/b91FFh2EPsExNTHHqECbEQsqDSgaBeOxYWIZfNeYdXfmBOIFPpbyB2VphB_6m_g5iu_ACtgA11X-64TsqWUtdv5x9fFzco4N7OzFYio?auto=format&dpr=1&w=1000',
      totalEarned: 10000000,
    },
    {
      place: 6,
      fullName: 'Germans',
      photoUrl:
        'https://i.seadn.io/gae/b91FFh2EPsExNTHHqECbEQsqDSgaBeOxYWIZfNeYdXfmBOIFPpbyB2VphB_6m_g5iu_ACtgA11X-64TsqWUtdv5x9fFzco4N7OzFYio?auto=format&dpr=1&w=1000',
      totalEarned: 100000,
    },
    {
      place: 7,
      fullName: 'Germans',
      photoUrl:
        'https://i.seadn.io/gae/b91FFh2EPsExNTHHqECbEQsqDSgaBeOxYWIZfNeYdXfmBOIFPpbyB2VphB_6m_g5iu_ACtgA11X-64TsqWUtdv5x9fFzco4N7OzFYio?auto=format&dpr=1&w=1000',
      totalEarned: 50000,
    },
    {
      place: 8,
      fullName: 'Germans',
      photoUrl:
        'https://i.seadn.io/gae/b91FFh2EPsExNTHHqECbEQsqDSgaBeOxYWIZfNeYdXfmBOIFPpbyB2VphB_6m_g5iu_ACtgA11X-64TsqWUtdv5x9fFzco4N7OzFYio?auto=format&dpr=1&w=1000',
      totalEarned: 50000,
    },
    {
      place: 9,
      fullName: 'Germans',
      photoUrl:
        'https://i.seadn.io/gae/b91FFh2EPsExNTHHqECbEQsqDSgaBeOxYWIZfNeYdXfmBOIFPpbyB2VphB_6m_g5iu_ACtgA11X-64TsqWUtdv5x9fFzco4N7OzFYio?auto=format&dpr=1&w=1000',
      totalEarned: 50000,
    },
    {
      place: 10,
      fullName: 'Germans',
      photoUrl:
        'https://i.seadn.io/gae/b91FFh2EPsExNTHHqECbEQsqDSgaBeOxYWIZfNeYdXfmBOIFPpbyB2VphB_6m_g5iu_ACtgA11X-64TsqWUtdv5x9fFzco4N7OzFYio?auto=format&dpr=1&w=1000',
      totalEarned: 50000,
    },
  ];

  const user = useSelector((state: RootState) => state.user);
  const [currentUser, setCurrentUser] = useState<RankUser | null>(null);

  useEffect(() => {
    const currentUser = findUserByName(`${user.name} ${user.surname}`, users);
    setCurrentUser(currentUser);
  }, []);

  return (
    <div className={styles.background}>
      {currentUser &&
        (currentUser.place === 1 ? (
          <WinnerRankCard user={currentUser} />
        ) : (
          <RankCard user={currentUser} />
        ))}
      <div className={styles.ranking}>
        {users.map((user: RankUser) => {
          if (user.place === 1) {
            return <WinnerRankCard key={`${user.place}-key`} user={user} />;
          } else {
            return <RankCard key={`${user.place}-key`} user={user} />;
          }
        })}
      </div>
    </div>
  );
};
