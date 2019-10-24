import React from 'react';
import { Text, View } from 'react-native';
import { Avatar, Surface, Paragraph } from 'react-native-paper';
import { ElevationStyles, TextStyles, SpacingStyles, PaperTheme } from '../styles/index'
import Ripple from 'react-native-material-ripple';


class Group extends React.Component {
    render() {
        return (
            <View style={{ flexDirection: 'row', margin: 10 }} >
                <View style={{ flex: 2, marginLeft: 10, alignSelf: "center" }}>
                    <Avatar.Icon size={40} icon="face" />
                </View>
                <View style={{ flex: 10, borderBottomColor: TextStyles.secondary.color, borderBottomWidth: 1, marginRight: 10 }}>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ flex: 8 }}>
                            <Text style={{ ...TextStyles.primary }}>{this.props.title}</Text>
                        </View>
                    </View>
                    <Text numberOfLines={1} style={{ ...TextStyles.secondary, marginBottom: 10 }}>{this.props.user}: {this.props.comment}</Text>
                </View>
            </View>
        )
    }
}

const theme = {
    dark: true,
    colors: {
        placeholder: 'rgba(255,255,255, .60)', text: 'rgba(255,255,255, .87)',
        underlineColor: 'transparent', background: 'rgba(255,255,255, .11)', primary: "#ef4f6a"
    },
}

export default Group;