export const ScreenName = {
  Articles: 'Articles',
  Article: 'Article',
} as const;

export type ScreenName = (typeof ScreenName)[keyof typeof ScreenName];
