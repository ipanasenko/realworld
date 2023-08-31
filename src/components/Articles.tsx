import { FC, useState } from 'react';
import { Button, Text } from 'react-native-ui-lib';
import { useArticles, UseArticlesParams } from '../services/realworld';
import { useNavigation } from '@react-navigation/native';
import { ScreenName } from '../constants';
import { FlatList } from 'react-native';
import { NavigationProp } from '@react-navigation/core/src/types';
import { NavigationParams } from '../types/navigation';
import { uniqBy } from 'rambda';

export const Articles: FC = () => {
  const { navigate } = useNavigation<NavigationProp<NavigationParams>>();

  const [filter, setFilter] = useState<UseArticlesParams>({});

  const { data, fetchNextPage } = useArticles(filter);

  const flatData = data?.pages.flatMap((page) => page.articles) || [];
  const uniqFlatData = uniqBy(({ slug }) => slug, flatData);

  return (
    <>
      <Text>current filter: {JSON.stringify(filter)}</Text>
      <Button onPress={() => setFilter({})}>
        <Text>clear filters</Text>
      </Button>
      <Button
        onPress={() => setFilter((state) => ({ ...state, favorited: true }))}
      >
        <Text>show favorites</Text>
      </Button>
      <FlatList
        data={uniqFlatData}
        renderItem={({ item: article }) => (
          <>
            <Text>{article.title}</Text>
            {article.tagList.length ? (
              <>
                <Text>TAGS:</Text>
                {article.tagList.map((tag) => (
                  <Text
                    onPress={() => setFilter((state) => ({ ...state, tag }))}
                    key={tag}
                  >
                    {tag}
                  </Text>
                ))}
              </>
            ) : null}

            <Text>AUTHOR:</Text>
            <Text
              onPress={() =>
                setFilter((state) => ({
                  ...state,
                  author: article.author.username,
                }))
              }
            >
              {article.author.username}
            </Text>

            <Button
              onPress={() =>
                navigate(ScreenName.Article, { slug: article.slug })
              }
            >
              <Text>open</Text>
            </Button>
          </>
        )}
        keyExtractor={(item) => item.slug}
        onEndReached={() => fetchNextPage()}
      />
    </>
  );
};
