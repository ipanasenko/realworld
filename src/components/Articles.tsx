import { FC } from 'react';
import { Button, Text } from 'react-native-ui-lib';
import { useArticles } from '../services/realworld';
import { useNavigation } from '@react-navigation/native';
import { ScreenName } from '../constants';
import { FlatList } from 'react-native';
import { NavigationProp } from '@react-navigation/core/src/types';
import { NavigationParams } from '../types/navigation';

export const Articles: FC = () => {
  const { navigate } = useNavigation<NavigationProp<NavigationParams>>();

  const { data } = useArticles();

  return (
    <FlatList
      data={data?.articles}
      renderItem={({ item: article }) => (
        <>
          <Text>{article.title}</Text>
          <Button
            onPress={() => navigate(ScreenName.Article, { slug: article.slug })}
          >
            <Text>open</Text>
          </Button>
        </>
      )}
      keyExtractor={(item) => item.slug}
    />
  );
};
