import React from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import TopScreen from './main/screens/topscreen';
import GroupScreen from './main/screens/groupscreen';
import LiveScreen from './main/screens/livescreen';
import SettingsScreen from './main/screens/settingsscreen';
import PhotoScreen from './main/screens/photoscreen';
import PhotoPreviewScreen from './main/screens/photopreviewscreen';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './main/reducers/rootreducer'


const store = createStore(rootReducer);


const LiveStack = createStackNavigator({
  Live: {
    screen: LiveScreen,

  },

  PhotoPreview: {
    screen: PhotoPreviewScreen,
  }
},
  {
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
    }
  },
);

const TopStack = createStackNavigator({
  Top: {
    screen: TopScreen,
  },

  Photo: {
    screen: PhotoScreen,
  }
},
  {
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
    }
  },
);

TopStack.navigationOptions = ({ navigation }) => {

  let tabBarVisible = true;

  let routeName = navigation.state.routes[navigation.state.index].routeName

  if (routeName == 'Photo') {
    tabBarVisible = false
  }

  return {
    tabBarVisible,
  }
}

const TabNavigator = createMaterialBottomTabNavigator(
  {
    Top:
    {
      screen: TopStack,
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
          <Icon size={25} name="md-camera" style={{ color: tintColor }} />
        )
      }
    },
    Settings:
    {
      screen: SettingsScreen,
      navigationOptions:
      {
        tabBarLabel: 'Settings',
        tabBarIcon: ({ tintColor, focused }) => (
          <Icon size={25} name="md-settings" style={{ color: tintColor }} />
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
    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    )
  }
}
