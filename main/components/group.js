import React from 'react';
import { Text, View } from 'react-native';
import { Avatar, Surface, TouchableRipple } from 'react-native-paper';
import { ElevationStyles, TextStyles, SpacingStyles } from '../styles/index'

class Group extends React.Component {
    render() {
        return (
            <TouchableRipple
                onPress={() => console.log('Pressed')}
                rippleColor="rgba(0, 0, 0, .32)"
                style={{ height: 140, width: '50%' }}
            >
                <Surface style={{ ...SpacingStyles.card, ...ElevationStyles.one, height: 140, flexDirection: "column" }}>
                    <View style={{ flexDirection: "row" }}>
                        <View style={{ flex: 2, }}>
                            <Avatar.Icon size={40} icon="face" />
                        </View>
                        <View style={{ flex: 5, flexDirection: "column" }}>
                            <Text style={{ ...TextStyles.secondary, fontSize: 14 }} numberOfLines={1}>{this.props.title}</Text>
                            <Text style={{ ...TextStyles.primary, fontSize: 14 }} numberOfLines={1}>{this.props.user}</Text>
                        </View>
                    </View>
                    <View>
                        <Text style={{ ...TextStyles.primary, fontSize: 20, }} numberOfLines={3}>{this.props.comment}</Text>
                    </View>
                </Surface>
            </TouchableRipple>
        )
    }
}

export default Group;