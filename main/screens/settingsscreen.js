import React from 'react';
import { Text, View } from 'react-native';
import { SpacingStyles, TextStyles } from '../styles/index';
import { connect } from 'react-redux';
import { Avatar, Surface, Paragraph, Button } from 'react-native-paper';

class SettingsScreen extends React.Component {
  render() {
    return (
      <View style={{ ...SpacingStyles.container, alignItems: 'center' }}>
        <Button mode="contained" style={{...SpacingStyles.settings, alignSelf: 'flex-end'}}>edit</Button>
        <Avatar.Icon size={80} style={{ ...SpacingStyles.settings }} icon="face" />
        <View style={{flexDirection:'row', ...SpacingStyles.settings}}>
        <Text style={{ ...TextStyles.H4, }}>{this.props.user.name}</Text>
        {/* <IconButton
            icon="edit"
            size={TextStyles.H4.size}
            color={TextStyles.secondary.color}
            onPress={() => console.log('hi')}
          /> */}
        </View>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,

  }
}

export default connect(mapStateToProps)(SettingsScreen);