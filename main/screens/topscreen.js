import React from 'react';
import MessageList from './messagelist';

class TopScreen extends React.Component {
  render(){
    return(
      <MessageList chatroom="top"/>
    )
  }

}
export default TopScreen;