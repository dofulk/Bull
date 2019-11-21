import React from 'react';
import MessageList from './messagelist';

class LiveScreen extends React.Component {
  render(){
    return(
      <MessageList chatroom="live"/>
    )
  }

}
export default LiveScreen;