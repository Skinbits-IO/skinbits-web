import { ServerNotification } from '../../../entities';
import { getTimeDifferenceString } from '../utils';
import { NotificationCircle } from './notification-circle';

interface INotificationCardProps {
  notification: ServerNotification;
}

export const NotificationCard = ({ notification }: INotificationCardProps) => {
  const deliveryTime = getTimeDifferenceString(
    notification.readAt ?? Date.now(),
  );

  return (
    <div className="h-fit w-full bg-white/5 px-4 py-[14px] rounded-[14px] flex flex-col justify-center items-start gap-2 font-['Roboto']">
      {/* Application row */}
      <div className="flex items-center justify-start gap-1.5">
        <NotificationCircle />
        <h6 className="text-[12px] font-normal text-[#8D83FC]">
          {notification.type}
        </h6>
        <h6 className="text-[12px] font-normal text-[#A8A8A8]">
          {deliveryTime}
        </h6>
      </div>

      {/* Title */}
      <h5 className="text-[15px] font-normal text-[#E1E1E1]">
        {notification.name}
      </h5>

      {/* Description */}
      <p className="text-[13px] font-normal text-[#A8A8A8] leading-normal flex-1 whitespace-normal break-words">
        {notification.content}
      </p>

      {/* Optional Image */}
      {notification.picUrl && (
        <img
          src={notification.picUrl}
          alt="Notification Image"
          className="h-fit w-full text-[10px] font-normal text-white/20"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              window.location.origin + '/avatar.jpg';
          }}
        />
      )}
    </div>
  );
};
