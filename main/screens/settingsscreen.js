import React from 'react';
import { Text, View } from 'react-native';
import { SpacingStyles, TextStyles } from '../styles/index';
import { connect } from 'react-redux';
import { Avatar, Surface, Paragraph, Button } from 'react-native-paper';

class SettingsScreen extends React.Component {

  edit = () => {
    this.props.navigation.push('EditSettings')
  }

  newUser = () => {
    this.props.navigation.push('CreateUser')
  }

  render() {
    return (
      <View style={{ ...SpacingStyles.container, alignItems: 'center' }}>
        <Button mode="contained" style={{ ...SpacingStyles.settings, alignSelf: 'flex-end' }} onPress={this.edit.bind(this)}>edit</Button>
        <Avatar.Icon size={80} style={{ ...SpacingStyles.settings }} icon="face" />
        <View style={{ flexDirection: 'row', ...SpacingStyles.settings }}>
          <Text style={{ ...TextStyles.H4, }}>{this.props.user.name}</Text>
          <Button mode="contained" style={{ ...SpacingStyles.settings }} onPress={this.newUser.bind(this)}>New User</Button>
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