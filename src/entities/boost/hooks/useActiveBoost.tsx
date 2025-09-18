import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../shared';
import { activateBoost, resetBoost } from '../model';

export const useActiveBoost = () => {
  const dispatch = useAppDispatch();
  const { isActive, type, endTime } = useAppSelector((state) => state.boost);

  useEffect(() => {
    if (isActive && type && endTime) {
      localStorage.setItem(
        'pendingBoostSession',
        JSON.stringify({ type, endTime }),
      );

      setTimeout(() => {
        dispatch(resetBoost());
        localStorage.removeItem('pendingBoostSession');
      }, endTime - Date.now());
    }
  }, [isActive, type, endTime]);

  useEffect(() => {
    const pendingBoost = localStorage.getItem('pendingBoostSession');
    if (pendingBoost) {
      const { type, endTime } = JSON.parse(pendingBoost) as {
        type: 'tapboost' | 'fuelboost';
        endTime: number;
      };

      if (endTime - Date.now() > 0) {
        dispatch(activateBoost({ type, endTime }));
      } else {
        localStorage.removeItem('pendingBoostSession');
      }
    }
  }, []);
};
