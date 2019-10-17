import React from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import { SpacingStyles, TextStyles, ButtonStyles } from '../styles/index'
import { Button, IconButton, FAB } from 'react-native-paper';

class PhotoPreviewScreen extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View style={{ ...SpacingStyles.container }} >
                <TouchableOpacity onPress={() => console.log('bye')}>
                <Image
                    style={{ width: '100%', height: '100%' }}
                    source={require('../assets/test.jpg')}
                />
                </TouchableOpacity>
                <FAB icon="send" style={{ ...ButtonStyles.fab }} onPress={() => console.log('hi')}></FAB>
            </View>
        )
    }
}


export default PhotoPreviewScreen;