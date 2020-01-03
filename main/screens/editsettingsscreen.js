import React from 'react';
import { Text, View } from 'react-native';
import { SpacingStyles, TextStyles } from '../styles/index';
import { connect } from 'react-redux';
import { Avatar, Surface, Paragraph, Button, TextInput } from 'react-native-paper';
import { StackRouter } from 'react-navigation';
import { changeName } from '../redux/actions';

class EditSettingsScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: this.props.user.name
    }

  }


    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Edit Profile',
            headerStyle: {
                // workaround for lack of support for an overlay
                backgroundColor: '#2b2b2b', 
            },
            headerTintColor: 'rgba(255,255,255, .60)',
            headerTitleStyle: {
                fontSize: 20,
                color: 'rgba(255,255,255, .60)',
            },
        }
    }

    componentWillUnmount() {
        this.props.changeName(this.state.user)
    }

    handleUsername = () => {

    }

    onChangeText = (text) => {
        this.setState({
            user: text
        })
    }

    render() {
        return (
            <View style={{ ...SpacingStyles.container, alignItems: 'center' }}>
                <Avatar.Icon size={80} style={{ ...SpacingStyles.settings }} icon="face" />
                <View style={{ flexDirection: 'row', ...SpacingStyles.settings }}>
                    <TextInput
                        style={{ ...TextStyles.H4, width: '90%' }}
                        mode="outlined"
                        value={this.state.user}
                        onChangeText={text => this.onChangeText(text)}
                        />
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
const mapDispatchToProps = {
    changeName
}


export default connect(mapStateToProps, mapDispatchToProps)(EditSettingsScreen);