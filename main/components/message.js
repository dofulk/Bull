import React from 'react';
import { Text, View  } from 'react-native';
import { Avatar, Surface, TouchableRipple, Paragraph,} from 'react-native-paper';
import { ElevationStyles, TextStyles, SpacingStyles } from '../styles/index'


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
        <TouchableRipple
          onPress={() => console.log('Pressed')}
          rippleColor="rgba(0, 0, 0, .32)"
        >
          <Surface style={[{...SpacingStyles.card}, this.getStyles(this.props.hearts)]}>
            <View style={{ flex: 1 }}>
              <Avatar.Icon size={40} icon="face" />
            </View>
            <View style={{ flex: 6 }}>
              <View style={{ flexDirection: 'row' }}>
                <View style={{ flex: 8 }}>
                  <Text style={{...TextStyles.secondary, fontSize: 14,}}>{this.props.title}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{...TextStyles.secondary, fontSize: 14,}}>{this.state.date}</Text>
                </View>
              </View>
              <Paragraph style={{...TextStyles.primary, fontSize: 20,}}>{this.props.comment}</Paragraph>
            </View>
          </Surface>
        </TouchableRipple>
      )
    }
  }


  export default Message