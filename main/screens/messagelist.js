import React from 'react';
import { View, Animated, KeyboardAvoidingView, FlatList } from 'react-native';
import { Surface, FAB, IconButton } from 'react-native-paper';
import Message from '../components/message';
import MessageInput from '../components/messageinput';
import { SpacingStyles, ButtonStyles } from '../styles/index';
import { connect } from 'react-redux';
import { getMessages, addNewMessage } from '../redux/actions';
import { withNavigation } from 'react-navigation';

class MessageList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listHeight: 0,
      containerHeight: 0,
      showInput: false,
      text: '',
      keyboardHeight: 0,
      normalHeight: 0,
      shortHeight: 0,
    };
  }


  sendMessage = () => {
    this.props.addNewMessage(
      this.props.socket.socketio,
      { user: this.props.user.name, message: this.state.text, hearts: 2, date: new Date(), chat: this.props.chatroom, type: 'message' }
    )
    this.setState({
      showInput: false,
      text: ''
    })
    console.log(this.props.chatMessages)
  }

  sendPhoto = () => {
    this.props.navigation.push('Camera', {
      chat: this.props.chatroom
    })
    console.log('I')
  }

  changeInputState = () => {
    this.setState({
      showInput: true
    });
  }

  willShowOptions = () => {
    return false
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
            <MessageInput
              onChangeText={(text) => this.setState({ text })}
              value={this.state.text}
              multiline={true}
              theme={theme}
              sendMessage={this.sendMessage}
              style={{ marginTop: 5 }}

            >

            </MessageInput>

          </Surface>
        </View>


    } else {
      input = 
      <>
      <FAB
        style={{ ...ButtonStyles.fab, bottom: 72 }}
        icon="camera"
        onPress={() => this.sendPhoto()}
        theme={theme}
      />
      <FAB
        style={{ ...ButtonStyles.fab, bottom: 0 }}
        icon="add"
        onPress={() => this.changeInputState()}
        theme={theme}
      />
      </>
    }

    return (
      <KeyboardAvoidingView style={[{ ...SpacingStyles.container }, { position: 'absolute', left: 0, right: 0, bottom: 0, top: 0 }]}>

        <FlatList
          contentContainerStyle={{ paddingBottom: 250 }}
          data={this.props.comments}
          resetScrollToCoords={{ x: 0, y: 0 }}
          extradata={this.state}
          scrollEnabled={true}
          renderItem={({ item }) =>
            <Message
              comment={item.message}
              title={item.user}
              date={item.date}
              changeInput={this.changeInputState}
              type={item.type}
              willShowOptions={this.willShowOptions}
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

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.user,
    comments: state.chatMessages[ownProps.chatroom],
    socket: state.socket

  }
}

const mapDispatchToProps = {
  addNewMessage,
  getMessages
}


export default withNavigation(connect(mapStateToProps, mapDispatchToProps)(MessageList));