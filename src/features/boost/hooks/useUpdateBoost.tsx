import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { updateBoost } from '../api';
import { activateBoost } from '../model';
import { setUser, useUpdateBalance } from '../../../entities';
import { useAppDispatch, useStatusNotification } from '../../../shared';

export const useUpdateBoost = (onSuccess: () => void) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const addNotification = useStatusNotification();
  const { mutate: mutateBalance, isPending: isBalancePending } =
    useUpdateBalance();

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
      dispatch(setUser(data));

      if (!isActivating) {
        mutateBalance({ newBalance: data.balance - 1e5 });
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
    isPending: updateBoostMutation.isPending || isBalancePending,
  };
};
