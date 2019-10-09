import React from 'react';
import { View } from 'react-native';
import { TextInput } from 'react-native-paper';


class MessageInput extends React.Component {
  constructor(props) {
    super(props);

  }

  changeText() {

  }

  render() {
    return (
      <View style={{ margin: 5 }}>
        <TextInput
          {...this.props}

          placeholder="New Message!"
          dense={true}
          keyboardAppearance="dark"
          mode="outlined"

        />
      </View>
    )
  }
}

export default MessageInput