import React from 'react';
import { StyleSheet, Text, View, Animated, Easing } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import { Avatar, Button, Surface, TouchableRipple, FAB, Paragraph } from 'react-native-paper';
import io from 'socket.io-client';
import { FlatList } from 'react-native-gesture-handler';
import { RNCamera } from 'react-native-camera'



class TopScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: [],
      fadeAnim: new Animated.Value(1),
      listHeight: 0,
      containerHeight: 0,
    };


    this.socket = io('http://10.0.2.2:3000');

  }

  componentDidMount() {
    this.socket.on('message', comment => {
      this.setState((state) => {
        const comments = state.comments;
        if (comments.length > 0 && Date.parse(comment.date) - Date.parse(comments[comments.length - 1].date) < 5000) {
          const newcomment = comments.pop()
          newcomment.message = newcomment.message.concat("\n\n", comment.message);
          comments.push(newcomment)
          return { comments }
        } else {
          comments.push(comment)
          return { comments }
        }
      })
    })
  };


  addFab() {
    Animated.timing(
      this.state.fadeAnim,
      {
        toValue: 1,
        duration: 300,
      }
    ).start();
  }

  removeFab() {
    Animated.timing(
      this.state.fadeAnim,
      {
        toValue: 0,
        duration: 300,
      }
    ).start();
  }

  handleScroll(event) {
    // if ((this.state.listHeight - (event.nativeEvent.contentOffset.y + this.state.containerHeight)) < 100) {
    //   this.addFab()
    // } else {
    //   this.removeFab()
    // }

  }

  changeHeight(height) {
    let listHeight = height
    this.setState((state) => {
      return { listHeight }
    })
  }

  onLayout(e) {
    let containerHeight = e.nativeEvent.layout.height
    console.log(containerHeight)
    this.setState((state) => {
      return { containerHeight }
    })
  }

  render() {
    let { fadeAnim } = this.state

    return (
      <View style={styles.container}>
        <View
          style={styles.container}
          onLayout={this.onLayout.bind(this)}
        >
          <Animated.FlatList
            contentContainerStyle={{ paddingBottom: 250 }}
            data={this.state.comments}
            extradata={this.state}
            onContentSizeChange={(contentWidth, contentHeight) => {
              this.changeHeight(contentHeight)
            }
            }
            onScroll={this.handleScroll.bind(this)}
            renderItem={({ item }) => <Message comment={item.message} username={item.user} date={item.date} hearts={item.hearts}></Message>}
          />
          <Animated.View style={{ opacity: fadeAnim }}>
            <FAB
              style={styles.fab}
              icon="add"
              onPress={() => this.socket.emit('message', { user: 'Dom', message: "hello! Is it me your'e looking for? Can you hear the people sing?", date: new Date(), hearts: 5 })}
            />
          </Animated.View>
        </View>



      </View>
    )
  }
}


class GroupScreen extends React.Component {

  takePicture = async() => {
    if (this.camera) {
      const options = { quality: 0.5, base64: true };
      const data = await this.camera.takePictureAsync(options);
      console.log(data.uri);
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <RNCamera
          ref={ref => {
            this.camera = ref;
          }}
          style={styles.preview}
          type={RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.on}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          androidRecordAudioPermissionOptions={{
            title: 'Permission to use audio recording',
            message: 'We need your permission to use your audio',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          onGoogleVisionBarcodesDetected={({ barcodes }) => {
            console.log(barcodes);
          }}
        />
        <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
          <TouchableOpacity onPress={this.takePicture.bind(this)} style={styles.capture}>
            <Text style={{ fontSize: 14 }}> SNAP </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
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

  constructor() {
    super()
    this.state = {
      date: ''
    }
  }

  componentDidMount() {
    this.getTime(this.props.date)
  }

  getTime(messagedate) {

    this.setState(() => {
      let currentDate = new Date(messagedate)

      return { date: (currentDate.getHours() + ':' + currentDate.getMinutes()) }
    })
  }

  getStyles(hearts) {
    if (hearts == 0) {
      return {
        elevation: 1,
        backgroundColor: 'rgba(255,255,255, .05)',
      }
    } else if (hearts == 1) {
      return {
        elevation: 2,
        backgroundColor: 'rgba(255,255,255, .07)',
      }
    } else if (hearts == 2) {
      return {
        elevation: 3,
        backgroundColor: 'rgba(255,255,255, .08)',
      }
    } else if (hearts == 3) {
      return {
        elevation: 4,
        backgroundColor: 'rgba(255,255,255, .09)',
      }
    } else if (hearts == 4) {
      return {
        elevation: 6,
        backgroundColor: 'rgba(255,255,255, .11)',
      }
    } else if (hearts == 5) {
      return {
        elevation: 8,
        backgroundColor: 'rgba(255,255,255, .12)',
      }
    } else {
      alert('AAAAAAAAAAAAAAAAAAAA')
    }
  }

  render() {
    return (
      <TouchableRipple
        onPress={() => console.log('Pressed')}
        rippleColor="rgba(0, 0, 0, .32)"
      >
        <Surface style={[styles.card, this.getStyles(this.props.hearts)]}>
          <View style={{ flex: 1 }}>
            <Avatar.Icon size={40} icon="face" style={styles.avatar} />
          </View>
          <View style={{ flex: 7 }}>
            <View style={{ flexDirection: 'row' }}>
              <View style={{ flex: 8 }}>
                <Text style={styles.secondaryText}>{this.props.username}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.secondaryText}>{this.state.date}</Text>
              </View>
            </View>
            <Paragraph style={styles.primaryText}>{this.props.comment}</Paragraph>
          </View>
        </Surface>
      </TouchableRipple>
    )
  }
}



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
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
  avatar: {
  },
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
      screen: GroupStack,
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
