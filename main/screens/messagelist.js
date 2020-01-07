import React from 'react';
import { View, Animated, KeyboardAvoidingView, FlatList } from 'react-native';
import { Surface, FAB, IconButton } from 'react-native-paper';
import Message from '../components/message';
import MessageInput from '../components/messageinput';
import { SpacingStyles, ButtonStyles } from '../styles/index';
import { connect } from 'react-redux';
import { getMessages, addNewMessage, loadPhoto } from '../redux/actions';
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
  }

  changeInputState = () => {
    this.setState({
      showInput: true
    });
  }


  loadPhoto = (id) => {
    this.props.loadPhoto(id)
  }

  photoLoaded = (id) => {
    return this.props.photos.some(data => data._id == id)
  }

  getPhoto = (id) => {
    return this.props.photos.find(data => data._id == id)
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
      />
      <FAB
        style={{ ...ButtonStyles.fab, bottom: 0}}
        icon="add"
        onPress={() => this.changeInputState()}
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
              loadPhoto={this.loadPhoto}
              imgId={item.imgId}
              photoLoaded={this.photoLoaded}
              getPhoto={this.getPhoto}
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


const mapStateToProps = (state, ownProps) => {
  return {
    user: state.user,
    comments: state.chatMessages[ownProps.chatroom],
    socket: state.socket,
    photos: state.photos

  }
}

const mapDispatchToProps = {
  addNewMessage,
  getMessages,
  loadPhoto
}


export default withNavigation(connect(mapStateToProps, mapDispatchToProps)(MessageList));