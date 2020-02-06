import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Avatar, Surface, Paragraph } from 'react-native-paper';
import { ElevationStyles, TextStyles, SpacingStyles, PaperTheme } from '../styles/index'



class Group extends React.Component {
    render() {
        return (
            <TouchableOpacity onPress={this.props.onPressButton}>
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
            </TouchableOpacity>
        )
    }
}


export default Group;