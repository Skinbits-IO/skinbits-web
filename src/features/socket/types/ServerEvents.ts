export type ServerEvents = {
  error: (data: string) => void;
  newTapToken: (data: { tapToken: string }) => void;
  // add more events your server emits
};
