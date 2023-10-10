import React from 'react';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import 'react-native-gesture-handler';
import {createStackNavigator} from '@react-navigation/stack';
import Routes from './src/Routes';

const Stack = createStackNavigator();

const App = () => {
  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: '#ffffff',
    },
  };

  return (
    <NavigationContainer theme={theme}>
      <Routes />
    </NavigationContainer>
  );
};

export default App;
