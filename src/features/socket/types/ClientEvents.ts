export type ClientEvents = {
  hello: (data: { from: string }) => void;
  // add more events you emit
};
