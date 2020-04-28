/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable prettier/prettier */
import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import IndexScreen from './src/screens/IndexScreen';
import ShowScreen from './src/screens/ShowScreen';
import CreateScreen from './src/screens/CreateScreen';
import EditScreen from './src/screens/EditScreen';
import { Provider } from './src/context/BlogContext';

const navigator = createStackNavigator(
  {
    IndexScreen: IndexScreen,
    ShowScreen: ShowScreen,
    CreateScreen: CreateScreen,
    EditScreen: EditScreen,
  },
  {
    initialRouteName: 'IndexScreen',
    defaultNavigationOptions: {
      title: 'Blogs',
    },
  },
);

const App = createAppContainer(navigator);
export default () => {
  return (<Provider><App /></Provider>);
};
