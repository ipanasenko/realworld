import { FC } from 'react';
import { Text, View } from 'react-native-ui-lib';
import { useArticle } from '../services/realworld';
import { RouteProp, useRoute } from '@react-navigation/native';
import { NavigationParams } from '../types/navigation';

export const Article: FC = () => {
  const { params } = useRoute<RouteProp<NavigationParams, 'Article'>>();
  const { data } = useArticle({ slug: params?.slug });

  return (
    <View>
      <Text>{data?.article.title}</Text>
      <Text>{data?.article.body.replaceAll('\\n', '\n')}</Text>
    </View>
  );
};
