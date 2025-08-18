import { AppDispatch } from '../../../../app/store';
import {
  addNotification,
  removeNotification,
  StatusNotification,
} from './slice';

export const setNotificationWithTimeout =
  (notification: Omit<StatusNotification, 'id'>) => (dispatch: AppDispatch) => {
    const id = Date.now();
    dispatch(addNotification({ ...notification, id }));

    setTimeout(() => {
      dispatch(removeNotification(id));
    }, notification.duration);
  };
