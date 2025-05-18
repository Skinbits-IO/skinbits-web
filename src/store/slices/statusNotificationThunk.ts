import { AppDispatch } from '..';
import {
  addNotification,
  removeNotification,
  StatusNotification,
} from './statusNotificationSlice';

export const setNotificationWithTimeout =
  (notification: Omit<StatusNotification, 'id'>) => (dispatch: AppDispatch) => {
    const id = Date.now();
    dispatch(addNotification({ ...notification, id }));

    setTimeout(() => {
      dispatch(removeNotification(id));
    }, notification.duration);
  };
