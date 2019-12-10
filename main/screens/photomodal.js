import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { SpacingStyles, } from '../styles/index'


class PhotoModal extends React.Component {
    constructor(props) {
        super(props)
    }



    render() {
        return (
            <View style={{ ...SpacingStyles.container }} >
                <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                    <Image
                        style={{ width: '100%', height: '100%' }}
                        source={{ uri: this.props.navigation.getParam('image') }}
                    />
                </TouchableOpacity>
            </View>
        )
    }
}



export default PhotoModal;

