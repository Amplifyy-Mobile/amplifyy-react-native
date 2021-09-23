/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
.**/
// import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Tabs from './navigation/tabs';

const App = () => {
  return (
    <NavigationContainer>
      <Tabs />
    </NavigationContainer>
  );
};

export default App;
