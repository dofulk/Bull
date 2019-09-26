import React from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import TopScreen from './main/screens/topscreen';
import GroupScreen from './main/screens/groupscreen';
import LiveScreen from './main/screens/livescreen';
import DetailsScreen from './main/screens/detailsscreen';








const LiveStack = createStackNavigator({
  Live: {
    screen: LiveScreen,
    navigationOptions: {
      title: 'Live',
      headerStyle: {
        backgroundColor: '#303030'
      },
      headerTitleStyle: {
        color: 'rgba(255,255,255, .87)'
      }
    }
  },
  Details: DetailsScreen,
});




const TabNavigator = createMaterialBottomTabNavigator(
  {
    Top:
    {
      screen: TopScreen,
      navigationOptions:
      {
        tabBarIcon: ({ tintColor, focused }) => (
          <Icon size={25} name="md-star" style={{ color: tintColor }} />
        )
      },
    },
    Group:
    {
      screen: GroupScreen,
      navigationOptions:
      {
        tabBarLabel: 'Group',
        tabBarIcon: ({ tintColor, focused }) => (
          <Icon size={25} name="md-globe" style={{ color: tintColor }} />
        )
      }
    },
    Live:
    {
      screen: LiveStack,
      navigationOptions:
      {
        tabBarLabel: 'Live',
        tabBarIcon: ({ tintColor, focused }) => (
          <Icon size={25} name="md-boat" style={{ color: tintColor }} />
        )
      }
    },
  },
  {
    initialRouteName: "Top",
    activeColor: 'rgba(255,255,255, .87)',
    inactiveColor: 'rgba(255,255,255, .60)',
    barStyle: { backgroundColor: '#303030' },
    labeled: false,
  },
);



const AppContainer = createAppContainer(TabNavigator);





export default class App extends React.Component {



  render() {
    return <AppContainer />;
  }
}
