import React from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import { SpacingStyles, TextStyles, ButtonStyles } from '../styles/index'
import { Button, IconButton, FAB } from 'react-native-paper';
import { getMessages, addNewPhotoMessage } from '../redux/actions';
import { connect } from 'react-redux';

class PhotoPreviewScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            image: this.props.navigation.getParam('imageUri')
        }
    }

    sendPhoto = () => {
        this.props.addNewPhotoMessage(
             this.state.image,
            { user: this.props.user.name, message: 'hi', hearts: 2, date: new Date(), chat: this.props.navigation.getParam('chat'), type: 'image_message' }
        )
    }


    render() {

        return (
            <View style={{ ...SpacingStyles.container }} >
                <TouchableOpacity onPress={() => console.log('bye')}>
                    <Image
                        style={{ width: '100%', height: '100%' }}
                        source={{ uri: this.state.image }}
                    />
                </TouchableOpacity>
                <FAB icon="send" style={{ ...ButtonStyles.fab, bottom: 0 }} onPress={this.sendPhoto}></FAB>
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        socket: state.socket

    }
}

const mapDispatchToProps = {
    addNewPhotoMessage,
    getMessages
}


export default  connect(mapStateToProps, mapDispatchToProps)(PhotoPreviewScreen);