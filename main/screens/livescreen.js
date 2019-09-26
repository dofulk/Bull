import React from 'react';
import { Text, View } from 'react-native';
import { SpacingStyles, TextStyles } from '../styles/index'

class LiveScreen extends React.Component {
    render() {
      return (
        <View style={{...SpacingStyles.container}}>
          <Text style={{...TextStyles.primary}}>Live!</Text>
        </View>
      )
    }
  }

  export default LiveScreen;