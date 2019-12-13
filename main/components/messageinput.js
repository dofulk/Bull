import React from 'react';
import { View } from 'react-native';
import { TextInput, IconButton } from 'react-native-paper';
import { TextStyles } from '../styles';


class MessageInput extends React.Component {
  constructor(props) {
    super(props);

  }

  changeText() {

  }

  render() {
    return (
      <View style={{ marginLeft: 5, marginRight: 5, flexDirection: 'row' }}>
          <TextInput
            {...this.props}

            placeholder="New Message!"
            dense={true}
            keyboardAppearance="dark"
            style={{flex: 8}}

          />
        
          <IconButton
            icon="send"
            size={20}
            color={TextStyles.secondary.color}
            onPress={this.props.sendMessage}
            style={{alignSelf: "center"}}
          />
      </View>
    )
  }
}

export default MessageInput