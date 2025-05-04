import { useDispatch } from 'react-redux';
import { AppDispatch } from '../state/store';
import { setNotificationWithTimeout } from '../state/statusNotificationThunk';

export const useStatusNotification = () => {
  const dispatch = useDispatch<AppDispatch>();

  return (
    type: 'success' | 'error' | 'info' | 'warning',
    text: string,
    duration: number
  ) => {
    dispatch(setNotificationWithTimeout({ type, text, duration }));
  };
};
