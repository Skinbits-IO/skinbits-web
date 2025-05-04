import {
  addNotification,
  removeNotification,
  StatusNotification,
} from './statusNotificationSlice';
import { AppDispatch } from './store';

export const setNotificationWithTimeout =
  (notification: Omit<StatusNotification, 'id'>) => (dispatch: AppDispatch) => {
    const id = Date.now();
    dispatch(addNotification({ ...notification, id }));

    setTimeout(() => {
      dispatch(removeNotification(id));
    }, notification.duration);
  };
