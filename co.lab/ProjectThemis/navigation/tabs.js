import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import News from '../screens/News';
import Resources from '../screens/Resources';
import Bookmarks from '../screens/Bookmarks';

const Tab = createBottomTabNavigator();

function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={({route}) =>
        ({tabBarIcon: color}) => {
          let iconName;
          if (route.name === 'news') {
            iconName = 'home';
          }
          if (route.name === 'resources') {
            iconName = 'books';
          }
          if (route.name === 'bookmarks') {
            iconName = 'bookmark';
          }
          return <Icon name={iconName} color={color} size={20} />;
        }}
      tabBarOptions={{activeTintColor: 'black', inactiveTintColor: 'grey'}}>
      <Tab.Screen name="News" component={News} />
      <Tab.Screen name="Resources" component={Resources} />
      <Tab.Screen name="Bookmarks" component={Bookmarks} />
    </Tab.Navigator>
  );
}

export default Tabs;
