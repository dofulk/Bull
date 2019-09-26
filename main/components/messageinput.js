import React from 'react';
import { View } from 'react-native';
import {  TextInput } from 'react-native-paper';


class MessageInput extends React.Component {
    constructor(props) {
      super(props);
      this.state = { text: '', height: 0 };
    }
  
    changeText() {
  
    }
  
    render() {
      return (
        <View style={{ margin: 10 }}>
          <TextInput
            {...this.props}
  
            placeholder="New Message!"
            mode="flat"
  
            onContentSizeChange={(event) => {
              this.setState({ height: event.nativeEvent.contentSize.height })
            }}
            // style={{ height: this.state.height }}
            keyboardAppearance="dark"
  
  
          />
        </View>
      )
    }
  }

  export default MessageInput