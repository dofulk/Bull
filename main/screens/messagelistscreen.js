import React from 'react';
import MessageList from './messagelist';

class MessageListScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('group', 'Group'),
      headerStyle: {
         // workaround for lack of support for an overlay
        backgroundColor: '#2b2b2b', 
      },
      headerTintColor: 'rgba(255,255,255, .60)',
      headerTitleStyle: {
        fontSize: 20,
        color: 'rgba(255,255,255, .60)',
      },
    }
  }



  render() {
    return (
      <MessageList chatroom={this.props.navigation.getParam('group')} />
    )
  }

}
export default MessageListScreen;