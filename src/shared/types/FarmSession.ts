export type FarmingSession = {
  sessionId: number;
  startTime: string;
  endTime: string;
  amountFarmed: number;
  isClaimed: boolean;
  telegramId: number;
};
