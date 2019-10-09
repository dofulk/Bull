import React from 'react';
import { Text, View } from 'react-native';
import { Avatar, Surface, Paragraph, } from 'react-native-paper';
import { ElevationStyles, TextStyles, SpacingStyles } from '../styles/index';
import Ripple from 'react-native-material-ripple';


class Message extends React.Component {

  constructor() {
    super()
    this.state = {
      date: ''
    }
  }

  componentDidMount() {
    this.getTime(this.props.date)
  }

  getTime(messagedate) {

    this.setState(() => {
      let currentDate = new Date(messagedate)

      return { date: (currentDate.getHours() + ':' + currentDate.getMinutes()) }
    })
  }

  getStyles(hearts) {
    if (hearts == 0) {
      return {
        ...ElevationStyles.one
      }
    } else if (hearts == 1) {
      return {
        ...ElevationStyles.two
      }
    } else if (hearts == 2) {
      return {
        ...ElevationStyles.three
      }
    } else if (hearts == 3) {
      return {
        ...ElevationStyles.four
      }
    } else {
      alert('Somethings gone wrong')
    }
  }

  render() {

    return (

      <Surface style={[{ borderRadius: 10, margin: 5 }, this.getStyles(this.props.hearts)]} theme={theme}>
        <Ripple
          onPress={() => console.log('Pressed')}
          rippleColor="rgba(0, 0, 0, .32)"
          rippleContainerBorderReadius={10}
        >
          <View style={{ ...SpacingStyles.card }}>
            <View style={{ flex: 1 }}>
              <Avatar.Icon size={40} icon="face" />
            </View>
            <View style={{ flex: 6 }}>
              <View style={{ flexDirection: 'row' }}>
                <View style={{ flex: 8 }}>
                  <Text style={{ ...TextStyles.secondary, fontSize: 14, }}>{this.props.title}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{ ...TextStyles.secondary, fontSize: 14, }}>{this.state.date}</Text>
                </View>
              </View>
              <Paragraph style={{ ...TextStyles.primary, fontSize: 20, }}>{this.props.comment}</Paragraph>
            </View>
          </View>
        </Ripple>
      </Surface>
    )
  }
}

const theme = {
  dark: true,
  roundness: 5,
  colors: {
    placeholder: 'rgba(255,255,255, .60)', text: 'rgba(255,255,255, .87)',
    underlineColor: 'transparent', background: 'rgba(255,255,255, .11)', primary: "#ef4f6a", secondary: "#d6bd4c"
  }

}


export default Message