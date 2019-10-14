import React from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import { SpacingStyles, TextStyles } from '../styles/index'
import { Button } from 'react-native-paper';

class PhotoScreen extends React.Component {
    render() {
        return (
            <View style={{ ...SpacingStyles.container }} >
                <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                <Image
                style={{width: '100%', height: '100%'}}
                source={require('../assets/test.jpg')}
                />
                </TouchableOpacity>
            </View>
        )
    }
}

export default PhotoScreen;