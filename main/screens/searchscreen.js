import React from 'react';
import { View, Text } from 'react-native';
import { SpacingStyles, TextStyles } from '../styles/index';
import { TextInput, IconButton } from 'react-native-paper';

class SearchScreen extends React.Component {
    render() {
        return (
            <View style={{ flexDirection: 'column', ...SpacingStyles.container }}>
                <View style={{ flexDirection: 'row' }}>
                    <TextInput
                        mode="outlined"
                        placeholder="Find New Communities"
                        dense={true}
                        style={{ margin: 10, flex: 8 }}
                        multiline={false}
                    />
                    <IconButton
                        icon="search"
                        color={TextStyles.secondary.color}
                        style={{ alignSelf: 'center' }}
                        onPress={() => console.log('slaps')}
                    />
                </View>
            </View>
        )
    }
}

export default SearchScreen;

