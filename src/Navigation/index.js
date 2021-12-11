import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../screens/Home';
import SubReddit from '../screens/SubReddit';
import Posts from '../screens/Posts';
import Links from '../components/Links';
const Navigation = () => {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="SubReddit" component={SubReddit} />
        <Stack.Screen name="Posts" component={Posts} />
      </Stack.Navigator>
      <Links />
    </NavigationContainer>
  );
};

export default Navigation;
