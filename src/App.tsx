import React, { FC, Suspense } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ScreenName } from './constants';
import { Articles } from './components/Articles';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Article } from './components/Article';
import { Text } from 'react-native-ui-lib';

const Stack = createNativeStackNavigator();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: true,
    },
  },
});

const App: FC = () => (
  <QueryClientProvider client={queryClient}>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name={ScreenName.Articles}>
          {() => (
            <Suspense fallback={<Text>loading articles...</Text>}>
              <Articles />
            </Suspense>
          )}
        </Stack.Screen>
        <Stack.Screen name={ScreenName.Article}>
          {() => (
            <Suspense fallback={<Text>loading one article...</Text>}>
              <Article />
            </Suspense>
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  </QueryClientProvider>
);

export default App;
