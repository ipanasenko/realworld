import { ScreenName } from '../constants';
import { Article } from './realworld';

export type NavigationParams = {
  [ScreenName.Articles]: {};
  [ScreenName.Article]: { slug: Article['slug'] };
};
