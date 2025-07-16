import { useEffect } from 'react';
import { useBoost } from '../../../shared';
import {
  activateBoost,
  resetBoost,
} from '../../../store/slices/game/boostSlice';
import { AppDispatch } from '../../../store';
import { useDispatch } from 'react-redux';

export const useActiveBoost = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isActive, type, endTime } = useBoost();

  useEffect(() => {
    if (isActive && type && endTime) {
      localStorage.setItem(
        'pendingBoostSession',
        JSON.stringify({ type, endTime })
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
