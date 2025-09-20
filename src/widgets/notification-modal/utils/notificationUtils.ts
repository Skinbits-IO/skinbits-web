/**
 * Returns a time-difference string based on how long ago the notification time was.
 *
 * @param {number | Date} notificationTime - A timestamp (in ms) or Date object.
 * @returns {string} - 'now', 'XXm', 'XXh', or 'XXd'
 */
export function getTimeDifferenceString(notificationTime: number | Date) {
  // Convert Date object to a numeric timestamp if needed
  const notificationTimestamp =
    notificationTime instanceof Date
      ? notificationTime.getTime()
      : notificationTime;

  const now = Date.now();
  const diffInSeconds = Math.floor((now - notificationTimestamp) / 1000);

  if (diffInSeconds < 60) {
    return 'now';
  } else if (diffInSeconds < 3600) {
    // less than 1 hour
    const minutes = Math.floor(diffInSeconds / 60);
    return `${minutes}m`;
  } else if (diffInSeconds < 86400) {
    // less than 24 hours
    const hours = Math.floor(diffInSeconds / 3600);
    return `${hours}h`;
  } else {
    const days = Math.floor(diffInSeconds / 86400);
    return `${days}d`;
  }
}
