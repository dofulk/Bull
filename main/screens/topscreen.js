import React from 'react';
import { View, Animated, KeyboardAvoidingView, FlatList } from 'react-native';
import { Surface, FAB, IconButton } from 'react-native-paper';
import io from 'socket.io-client';
import Message from '../components/message';
import MessageInput from '../components/messageinput';
import { SpacingStyles, ButtonStyles } from '../styles/index';

class TopScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: [],
      fadeAnim: new Animated.Value(1),
      listHeight: 0,
      containerHeight: 0,
      showInput: false,
      text: '',
      keyboardHeight: 0,
      normalHeight: 0,
      shortHeight: 0,
      allComments: [],
    };


    this.socket = io('http://10.0.2.2:3000');

  }

  componentDidMount() {
    this.socket.on('message', comment => {
      this.setState((state) => {
        const allComments = state.allComments;
        allComments.push(comment)
        return { allComments }
      })
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
    });

  }


  sendMessage = () => {
    this.socket.emit('message', { user: "Dom", message: this.state.text, hearts: 2, date: new Date() })
    this.setState({
      showInput: false,
      text: ''
    });
  }

  changeInputState = () => {
    console.log('aaaaaaaaa')
    this.setState({
      showInput: true
    });
  }


  render() {
    const showInput = this.state.showInput
    let input

    if (showInput) {
      input =
        <View style={{ backgroundColor: "#121212" }}>
          <Surface
            style={{ elevation: 6, backgroundColor: 'rgba(255,255,255, .11)' }}
          >
            <IconButton
              icon="arrow-drop-up"
              color="white"
              size={20}
              style={{ margin: 0, alignSelf: 'center' }}
              onPress={() => this.sendMessage()}
            />
            <MessageInput
              onChangeText={(text) => this.setState({ text })}
              value={this.state.text}
              multiline={true}
              theme={theme}
              sendMessage={this.sendMessage}

            >

            </MessageInput>

          </Surface>
        </View>


    } else {
      input = <FAB
        style={{ ...ButtonStyles.fab }}
        icon="add"
        onPress={() => this.changeInputState()}
        theme={theme}
      />
    }

    return (
      <KeyboardAvoidingView style={[{ ...SpacingStyles.container }, { position: 'absolute', left: 0, right: 0, bottom: 0, top: 0 }]}>

        <FlatList
          contentContainerStyle={{ paddingBottom: 250 }}
          data={this.state.comments}
          resetScrollToCoords={{ x: 0, y: 0 }}
          extradata={this.state}
          scrollEnabled={true}
          renderItem={({ item }) =>
            <Message
              comment={item.message}
              title={item.user}
              date={item.date}
              hearts={item.hearts}
              navigation={this.props.navigation}
              changeInput={this.changeInputState}
              type='text'
            >
            </Message>
          }
          keyExtractor={item => item._id}
        />
        {input}
      </KeyboardAvoidingView>



    )
  }
}

const theme = {
  dark: true,
  colors: {
    placeholder: 'rgba(255,255,255, .60)', text: 'rgba(255,255,255, .87)',
    underlineColor: 'transparent', background: 'rgba(255,255,255, .11)', primary: "#ef4f6a", secondary: "#d6bd4c"
  },
  roundness: 5
}

export default TopScreen;