import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { Avatar, Button, Surface, TouchableRipple, FAB, Paragraph } from 'react-native-paper';
import io from 'socket.io-client';
import { FlatList } from 'react-native-gesture-handler';



class CommentList extends React.Component {

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.props.comments}
          extradata={this.props}
          renderItem={({ item }) => <Message comment={item.message} username={item.user}></Message>}
        />
      </View>

    )
  }
}

class TopScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { comments: [] };



    this.socket = io('http://10.0.2.2:3000');

  }




  componentDidMount() {
    this.socket.on('message', comment => {
      this.setState((state) => {
        const comments = state.comments;
        comments.push(comment)
        return { comments }
      });
    })
  };


  render() {
    return (
      <View style={styles.container}>
        <CommentList comments={this.state.comments} />
        <FAB
          style={styles.fab}
          small
          icon="plus"
          onPress={() => this.socket.emit('message', { user: 'Dom', message: 'hello!' })}
        />

      </View>
    )
  }
}


class GroupScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Group!</Text>
      </View>
    )
  }
}


class LiveScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Live!</Text>
      </View>
    )
  }
}

class DetailsScreen extends React.Component {
  render() {
    return (
      <View>
        <Text>Hello</Text>
      </View>
    )
  }
}

class Message extends React.Component {
  render() {
    return (
      <TouchableRipple
        onPress={() => console.log('Pressed')}
        rippleColor="rgba(0, 0, 0, .32)"
      >
        <Surface style={styles.card}>
          <View style={{ flex: 1 }}>
            <Avatar.Icon size={40} icon="face" style={styles.avatar} />
          </View>
          <View style={{ flex: 7 }}>
            <Text style={styles.secondaryText}>{this.props.username}</Text>
            <Paragraph style={styles.primaryText}>{this.props.comment}</Paragraph>
          </View>
        </Surface>
      </TouchableRipple>
    )
  }
}

const TopStack = createStackNavigator({
  Top: {
    screen: TopScreen,
    navigationOptions: {
      title: 'Top',
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

const GroupStack = createStackNavigator({
  Group: {
    screen: GroupScreen,
    navigationOptions: {
      title: 'Groups',
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#121212',
  },
  text: {
    color: 'rgba(255,255,255, .87)'
  },
  card: {
    backgroundColor: 'rgba(255,255,255, .09)',
    elevation: 4,
    marginTop: 5,
    marginRight: 10,
    marginLeft: 10,
    borderRadius: 10,
    padding: 5,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  primaryText: {
    color: 'rgba(255,255,255, .87)',
    fontSize: 20,
  },
  secondaryText: {
    color: 'rgba(255,255,255, .60)',
    fontSize: 14,
  },
  disabledText: {
    color: 'rgba(255,255,255, .38)'
  },
  button: {
    borderRadius: 20,
    width: 70
  },
  avatar: {
  },
});

const TabNavigator = createMaterialBottomTabNavigator(
  {
    Top:
    {
      screen: TopStack,
      navigationOptions:
      {
        tabBarLabel: 'Top',
      }
    },
    Group:
    {
      screen: GroupStack,
      navigationOptions:
      {
        tabBarLabel: 'Group'
      }
    },
    Live:
    {
      screen: LiveStack,
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



const AppContainer = createAppContainer(TabNavigator);





export default class App extends React.Component {



  render() {
    return <AppContainer />;
  }
}
