import { useDispatch } from 'react-redux';
import { setNotificationWithTimeout } from '../../store/slices/statusNotificationThunk';
import { AppDispatch } from '../../store';

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
