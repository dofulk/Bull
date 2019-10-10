import React from 'react';
import { Text, View } from 'react-native';
import { SpacingStyles, TextStyles } from '../styles/index'

class SettingsScreen extends React.Component {
    render() {
      return (
        <View style={{...SpacingStyles.container}}>
          <Text style={{...TextStyles.primary}}>Settings</Text>
        </View>
      )
    }
  }

  export default SettingsScreen;