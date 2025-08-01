export type Notification = {
  id: number;
  name: string;
  type: string;
  content: string;
  picUrl: string | null;
  createdAt: Date;
  startsAt: Date | null;
  expiresAt: Date | null;
  readAt: Date | null;
  isPermanent: boolean;
};
