import { api } from '../../../shared';
import { ServerNotification } from '../types';

/**
 * Raw shape returned by the server
 */
export interface NotificationDTO {
  notification_id: number;
  notification_name: string;
  notification_type: string;
  notification_content: string;
  pic_url: string | null;
  created_at: string;
  starts_at: string | null;
  expires_at: string | null;
  read_at: string | null;
  is_permanent: boolean;
  telegram_id: number | null; // <-- NEW
}

/**
 * Response shape if you want unread count too
 */
export interface NotificationResponse {
  notifications: NotificationDTO[];
  unreadCount: number;
}

/**
 * Fetch a page of notifications
 */
export async function getActiveNotifications(
  skip: number,
  limit: number,
): Promise<{ notifications: ServerNotification[]; unreadCount: number }> {
  const resp = await api.get<NotificationResponse>(`/notification`, {
    params: { skip, limit },
  });

  return {
    notifications: resp.data.notifications.map((dto) => ({
      id: dto.notification_id,
      name: dto.notification_name,
      type: dto.notification_type,
      content: dto.notification_content,
      picUrl: dto.pic_url,
      createdAt: new Date(dto.created_at),
      startsAt: dto.starts_at ? new Date(dto.starts_at) : null,
      expiresAt: dto.expires_at ? new Date(dto.expires_at) : null,
      readAt: dto.read_at ? new Date(dto.read_at) : null,
      isPermanent: dto.is_permanent,
      telegramId: dto.telegram_id, // <-- map new field
    })),
    unreadCount: resp.data.unreadCount,
  };
}
