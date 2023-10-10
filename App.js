import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import 'react-native-gesture-handler';
import {createStackNavigator} from '@react-navigation/stack';
import Routes from './src/Routes';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Routes />
    </NavigationContainer>
  );
};

export default App;
