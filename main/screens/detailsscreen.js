import React from 'react';
import { Text, View } from 'react-native';
import { SpacingStyles, TextStyles } from '../styles/index'

class DetailsScreen extends React.Component {
    render() {
      return (
        <View style={{...SpacingStyles.container}}>
          <Text style={{...TextStyles.primary}}>Details!</Text>
        </View>
      )
    }
  }

  export default DetailsScreen;