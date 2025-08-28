import { useAppDispatch } from '../../../hooks';
import { setNotificationWithTimeout } from '../model';

export const useStatusNotification = () => {
  const dispatch = useAppDispatch();

  return (
    type: 'success' | 'error' | 'info' | 'warning',
    text: string,
    duration: number
  ) => {
    dispatch(setNotificationWithTimeout({ type, text, duration }));
  };
};
