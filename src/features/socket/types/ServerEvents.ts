export type ServerEvents = {
  message: (data: string) => void;
  // add more events your server emits
};
