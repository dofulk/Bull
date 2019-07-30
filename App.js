import React from 'react';  
import {StyleSheet, Text, View,Button} from 'react-native';  
import { createAppContainer} from 'react-navigation';  
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';  
import { Provider as PaperProvider } from 'react-native-paper';


class TopScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Top!</Text>
      </View>
    )
  }
}


class GroupScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Group!</Text>
      </View>
    )
  }
}


class LiveScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text color='rgba(255,255,255, .87)'>Live!</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({  
  container: {  
      flex: 1,  
      justifyContent: 'center',  
      alignItems: 'center',  
      backgroundColor: '#121212',
  },  
});  

const TabNavigator = createMaterialBottomTabNavigator(
  {
    Top:
    {
      screen: TopScreen,
      navigationOptions:
      {
        tabBarLabel: 'Top'
      }
    },
    Group:
    {
      screen: GroupScreen,
      navigationOptions:
      {
        tabBarLabel: 'Group'
      }
    },
    Live:
    {
      screen: LiveScreen,
      navigationOptions:
      {
        tabBarLabel: 'Live'
      }
    },
  },
  {
    initialRouteName: "Top",
    activeColor: 'rgba(255,255,255, .87)',
    inactiveColor: 'rgba(255,255,255, .60)',
    barStyle: { backgroundColor: '#303030' },
  },
);

export default createAppContainer(TabNavigator);  