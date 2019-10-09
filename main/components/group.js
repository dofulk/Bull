import React from 'react';
import { Text, View } from 'react-native';
import { Avatar, Surface, Paragraph } from 'react-native-paper';
import { ElevationStyles, TextStyles, SpacingStyles, PaperTheme } from '../styles/index'
import Ripple from 'react-native-material-ripple';


class Group extends React.Component {
    render() {
        return (

            <Surface style={{ ...ElevationStyles.two, ...SpacingStyles.card, borderRadius: 10, margin: 5, padding: 5 }} theme={theme} >
                    <View style={{ flex: 1 }}>
                        <Avatar.Icon size={40} icon="face" />
                    </View>
                    <View style={{ flex: 6 }}>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ flex: 8 }}>
                                <Text style={{ ...TextStyles.secondary, fontSize: 14, }}>{this.props.title}</Text>
                            </View>
                        </View>
                        <Paragraph style={{ ...TextStyles.primary, fontSize: 20, }}>{this.props.comment}</Paragraph>
                    </View>
            </Surface>
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