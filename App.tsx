import React, { FC } from 'react';
import { Text, View, Button } from 'react-native-ui-lib';

import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const ViewAndText: FC<{ text: string; destination: string }> = ({
  text,
  destination,
}) => {
  const navigation = useNavigation();

  return (
    <View>
      <Text blue50 text20>
        {text}
        {/* @ts-ignore */}
        <Button onPress={() => navigation.navigate(destination)}>
          <Text>go to {destination}</Text>
        </Button>
      </Text>
    </View>
  );
};

const Home = () => {
  return <ViewAndText text={'Home'} destination={'Settings'} />;
};
const Settings = () => {
  return <ViewAndText text={'Settings'} destination={'Home'} />;
};

const App: FC = () => (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Settings" component={Settings} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default App;
