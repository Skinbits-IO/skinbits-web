import { api } from '../../../shared';
import { Notification } from '../../../shared';

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
}

/**
 * Fetch a page of notifications
 */
export async function getActiveNotifications(
  skip: number,
  limit: number
): Promise<Notification[]> {
  const resp = await api.get<NotificationDTO[]>(`/notification`, {
    params: { skip, limit },
  });
  return resp.data.map((dto) => ({
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
  }));
}
