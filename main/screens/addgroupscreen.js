import React from 'react';
import { View } from 'react-native';
import { SpacingStyles, TextStyles } from '../styles/index';
import { connect } from 'react-redux';
import { Avatar, Surface, Paragraph, Button, TextInput } from 'react-native-paper';
import { StackRouter } from 'react-navigation';
import { addNewGroup } from '../redux/actions';


class AddGroupScreen extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            groupName: ""
        }
    }

    static navigationOptions = ({ navigation }) => {
        return {
            title: 'New Group',
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

    onChangeText = (text) => {
        this.setState({
            groupName: text
        })
    }

    createGroup = () => {
        this.props.addNewGroup({
            comment: "Created a new Group",
            user: 'Dom',
            name: this.state.groupName
        })
        this.props.navigation.goBack()
        
    }

    render() {
        return (
            <View style={{ ...SpacingStyles.container, alignItems: 'center' }}>
                <TextInput
                    style={{ ...TextStyles.H4, width: '90%' }}
                    mode="outlined"
                    placeholder="Group Name"
                    onChangeText={text => this.onChangeText(text)}
                />
                <Button mode="contained" style={{ ...SpacingStyles.settings }} onPress={this.createGroup}>Create</Button>
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
    addNewGroup
}
export default connect(mapStateToProps, mapDispatchToProps)(AddGroupScreen);