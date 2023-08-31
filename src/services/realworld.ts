import axios from 'axios';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { Article, Comment } from '../types/realworld';

const instance = axios.create({ baseURL: 'https://api.realworld.io/api' });

export const useArticles = (params: {
  tag?: string;
  author?: string;
  favorited?: boolean;
}) => {
  return useInfiniteQuery<{ articles: Article[]; articlesCount: number }>({
    queryKey: ['articles'],
    queryFn: ({ pageParam }) => {
      return instance
        .get('/articles', { params: { ...params, ...pageParam, limit: 30 } })
        .then((res) => res.data);
    },
    getNextPageParam: ({ articlesCount }, allPages) => {
      const fetchedArticlesCount = allPages
        .map((data) => data.articles.length)
        .reduce((a, b) => a + b);
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
