import React from 'react';
import { View } from 'react-native';
import { TextInput, IconButton } from 'react-native-paper';


class MessageInput extends React.Component {
  constructor(props) {
    super(props);

  }

  changeText() {

  }

  render() {
    return (
      <View style={{ marginLeft: 5, marginRight: 5, flexDirection: 'row' }}>
        <View style={{ flex: 7 }}>
          <TextInput
            {...this.props}

            placeholder="New Message!"
            dense={true}
            keyboardAppearance="dark"

          />
        </View>
        <View style={{ flex: 1 }}>
          <IconButton
            icon="send"
            size={20}
            color="white"
            onPress={() => console.log('Pressed')}
          />
        </View >
      </View>
    )
  }
}

export default MessageInput