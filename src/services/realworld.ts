import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { Article } from '../types/realworld';

const instance = axios.create({ baseURL: 'https://api.realworld.io/api' });

export const useArticles = () => {
  return useQuery<{ articles: Article[]; articlesCount: number }>({
    queryKey: ['articles'],
    queryFn: () => instance.get('/articles').then((res) => res.data),
  });
};

export const useArticle = ({ slug }: { slug: Article['slug'] }) => {
  return useQuery<{ article: Article }>({
    queryKey: ['article', slug],
    queryFn: () => instance.get(`/articles/${slug}`).then((res) => res.data),
  });
};
