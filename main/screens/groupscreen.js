import React from 'react';
import { Text, View } from 'react-native';
import { SpacingStyles, TextStyles } from '../styles/index'

class GroupScreen extends React.Component {
    render() {
      return (
        <View style={{...SpacingStyles.container}}>
          <Text style={{...TextStyles.primary}}>HI</Text>
        </View>
      )
    }
  }

  export default GroupScreen;