export type ClientEvents = {
  hello: (data: { from: string }) => void;
  initTap: () => void;
  tap: (data: { tapToken: string }) => void;
};
