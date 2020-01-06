import React from 'react';
import {Text, View} from 'react-native';

import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import HomeScreen from './screens/Home/Home';
import EventScreen from './screens/Event/event';
import CategoryScreen from './screens/category/category';

const AppNavigator = createStackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      title: 'DumbTick App',
    },
  },
  Event: {
    screen: EventScreen,
    navigationOptions: {
      title: 'Events',
    },
  },
  Category: {
    screen: CategoryScreen,
    navigationOptions: {
      title: 'Page Category',
    },
  },
});

export default createAppContainer(AppNavigator);
