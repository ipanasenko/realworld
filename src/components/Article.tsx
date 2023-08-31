import { FC } from 'react';
import { Text } from 'react-native-ui-lib';
import { useArticle, useArticleComments } from '../services/realworld';
import { RouteProp, useRoute } from '@react-navigation/native';
import { NavigationParams } from '../types/navigation';
import { ScrollView } from 'react-native';

export const Article: FC = () => {
  const { params } = useRoute<RouteProp<NavigationParams, 'Article'>>();
  const slug = params?.slug;

  const { data: articleData } = useArticle({ slug });
  const { data: commentsData } = useArticleComments({ slug });

  return (
    <ScrollView>
      <Text>TITLE:</Text>
      <Text>{articleData?.article.title}</Text>
      <Text>BODY:</Text>
      <Text>{articleData?.article.body.replaceAll('\\n', '\n')}</Text>
      {commentsData?.comments.length ? (
        <>
          <Text>COMMENTS:</Text>
          {commentsData?.comments.map((comment) => (
            <Text key={comment.id}>{comment.body}</Text>
          ))}
        </>
      ) : null}
    </ScrollView>
  );
};
