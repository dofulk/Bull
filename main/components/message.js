import React from 'react';
import { Text, View } from 'react-native';
import { Avatar, Surface, Paragraph, Button, TouchableRipple, IconButton } from 'react-native-paper';
import { ElevationStyles, TextStyles, SpacingStyles } from '../styles/index';
import { withNavigation } from 'react-navigation';


class Message extends React.Component {

  constructor() {
    super()
    this.state = {
      date: '',
      showOptions: false,
    }
  }

  componentDidMount = () => {
    this.getTime(this.props.date)
    this.setState({
      showOptions: this.props.willShowOptions
    })
  }

  sendButton = () => {
    console.log('woosh')
  }

  goToCamera = () => {
    this.props.navigation.push('Camera')
  }

  getTime = (messagedate) => {

    this.setState(() => {
      let currentDate = new Date(messagedate)

      return { date: (currentDate.getHours() + ':' + currentDate.getMinutes()) }
    })
  }

  getStyles = (hearts) => {
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

  setOptions = () => {
    this.setState({
      showOptions: !this.state.showOptions
    })
  }


  render() {

    const messageType = this.props.type
    let type
    let options

    if (messageType === 'message') {
      type = <Paragraph style={{ ...TextStyles.primary, fontSize: 20, ...SpacingStyles.content, flex: 8 }}>{this.props.comment}</Paragraph>
    } else {
      type = <Button mode="contained" onPress={() => this.props.navigation.push('Photo', {image: this.props.image})} style={{ ...SpacingStyles.content, flex: 8 }}>This is a title about a pig thats really long</Button>
    }

    if (this.state.showOptions) {
      options =
        <View style={{ flexDirection: 'row' }}>
          <IconButton
            icon="trending-up"
            size={18}
            color={TextStyles.secondary.color}
            onPress={() => console.log('Stonks')}
          />
          <IconButton
            icon="comment"
            size={18}
            color={TextStyles.secondary.color}
            onPress={this.props.changeInput}
          />
          <IconButton
            icon="camera"
            size={18}
            color={TextStyles.secondary.color}
            onPress={this.goToCamera}
          />
          <IconButton
            icon="send"
            size={18}
            color={TextStyles.secondary.color}
            onPress={() => console.log('oops')}
          />

        </View>
    } else {
      options = null
    }

    return (

      <Surface style={[{ borderRadius: 10, margin: 5 }, this.getStyles(this.props.hearts)]} theme={theme}>
        <TouchableRipple
          onPress={() => console.log('Pressed')}
          rippleColor="rgba(0, 0, 0, .32)"
          rippleContainerBorderReadius={10}
          underlayColor="#121212"
          onPress={this.setOptions}
        >

          <View style={{ ...SpacingStyles.card }}>
            <View style={{ flex: 1, ...SpacingStyles.content }}>
              <Avatar.Icon size={40} icon="face" />
            </View>
            <View style={{ flex: 6, flexDirection: 'column' }}>

              <View style={{ flexDirection: 'row', ...SpacingStyles.content }}>
                <View style={{ flex: 8 }}>
                  <Text style={{ ...TextStyles.secondary, fontSize: 14, }}>{this.props.title}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{ ...TextStyles.secondary, fontSize: 14, }}>{this.state.date}</Text>
                </View>
              </View>
              <View style={{ flexDirection: "row", margin: 0 }}>
                <View style={{ flexDirection: "column" }}>
                  {type}
                  {options}
                  </View>
                </View>

              
            </View>

          </View>
        </TouchableRipple>
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


export default withNavigation(Message)