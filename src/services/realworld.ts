import axios from 'axios';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { Article, Comment } from '../types/realworld';

const instance = axios.create({ baseURL: 'https://api.realworld.io/api' });

export interface UseArticlesParams {
  tag?: string;
  author?: string;
  favorited?: boolean;
}

export const useArticles = (params: UseArticlesParams) => {
  return useInfiniteQuery<{ articles: Article[]; articlesCount: number }>({
    queryKey: ['articles', params],
    queryFn: ({ pageParam }) => {
      return instance
        .get('/articles', { params: { ...params, ...pageParam, limit: 30 } })
        .then((res) => res.data);
    },
    getNextPageParam: ({ articlesCount }, allPages) => {
      const fetchedArticlesCount = allPages.reduce(
        (acc, page) => acc + page.articles.length,
        0,
      );

      if (fetchedArticlesCount < articlesCount) {
        return { offset: fetchedArticlesCount };
      }
    },
  });
};

export const useArticle = ({ slug }: { slug: Article['slug'] }) => {
  return useQuery<{ article: Article }>({
    queryKey: ['article', slug],
    queryFn: () => instance.get(`/articles/${slug}`).then((res) => res.data),
  });
};

export const useArticleComments = ({ slug }: { slug: Article['slug'] }) => {
  return useQuery<{ comments: Comment[] }>({
    queryKey: ['comments', slug],
    queryFn: () =>
      instance.get(`/articles/${slug}/comments`).then((res) => res.data),
  });
};
