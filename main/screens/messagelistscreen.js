import React from 'react';
import MessageList from './messagelist';

class MessageListScreen extends React.Component {
  render(){
    return(
      <MessageList chatroom={this.props.navigation.getParam('group')}/>
    )
  }

}
export default MessageListScreen;