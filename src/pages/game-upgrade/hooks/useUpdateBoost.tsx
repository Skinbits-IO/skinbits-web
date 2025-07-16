import { useMutation } from '@tanstack/react-query';
import { updateBoost } from '../api';
import { setUser } from '../../../store/slices/userSlice';
import { setUserGameInfo } from '../../../store/slices/game/userGameInfoSlice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../store';
import { useStatusNotification, useUpdateBalance } from '../../../shared';
import { useState } from 'react';
import { activateBoost } from '../../../store/slices/game/boostSlice';
import { useNavigate } from 'react-router';

export const useUpdateBoost = (onSuccess: () => void) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const addNotification = useStatusNotification();
  const { mutation: updateBalanceMutation } = useUpdateBalance();

  const [type, setType] = useState<'tapboost' | 'fuelboost' | null>(null);
  const [isActivating, setIsActivating] = useState(false);

  const updateBoostMutation = useMutation({
    mutationFn: (data: {
      type: 'tapboost' | 'fuelboost';
      quantity: number;
    }) => {
      setType(data.type);
      setIsActivating(data.quantity < 0);

      return updateBoost(data.type, data.quantity);
    },
    onSuccess: (data) => {
      dispatch(setUser(data.user));
      dispatch(setUserGameInfo(data.userGameInfo));

      if (!isActivating) {
        updateBalanceMutation.mutate({ newBalance: data.user.balance - 1e5 });
      } else {
        if (type) {
          dispatch(activateBoost({ type, endTime: Date.now() + 180000 }));
          navigate('/');
        }
      }

      onSuccess();
    },
    onError: (err) => {
      addNotification('error', err.message || 'Failed to update boost', 3000);
    },
  });

  return {
    updateBoostMutation,
    isPending: updateBoostMutation.isPending || updateBalanceMutation.isPending,
  };
};
