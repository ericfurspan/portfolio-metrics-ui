export const wait = (delay_ms: number) =>
  new Promise((resolve) => setTimeout(resolve, delay_ms));
