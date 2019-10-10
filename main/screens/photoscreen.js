import React from 'react';
import { View, Image } from 'react-native';
import { SpacingStyles, TextStyles } from '../styles/index'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Button } from 'react-native-paper';

class PhotoScreen extends React.Component {
    render() {
        return (
            <View style={{ ...SpacingStyles.container }} >
                <Image
                style={{width: '100%', height: '100%'}}
                source={require('../assets/test.jpg')}
                />
            </View>
        )
    }
}

export default PhotoScreen;