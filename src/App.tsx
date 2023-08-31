import React, { FC } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ScreenName } from './constants';
import { Articles } from './components/Articles';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Article } from './components/Article';

const Stack = createNativeStackNavigator();

const queryClient = new QueryClient();

const App: FC = () => (
  <QueryClientProvider client={queryClient}>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name={ScreenName.Articles} component={Articles} />
        <Stack.Screen name={ScreenName.Article} component={Article} />
      </Stack.Navigator>
    </NavigationContainer>
  </QueryClientProvider>
);

export default App;
