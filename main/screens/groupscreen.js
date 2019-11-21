import React from 'react';
import { View } from 'react-native';
import { SpacingStyles } from '../styles/index'
import Group from '../components/group'
import { FlatList } from 'react-native-gesture-handler';
import MessageListScreen from './messagelistscreen'

class GroupScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      groups: [
        { comment: "Hello", group: "the worst group ever", user: "Dom" },
        { comment: "Hello. Am I a participant in the world or am I just a passive spectator to life?", group: "the best group ever", user: "Dom" }
      ],
    }
  };

  goToGroup = (group) => {
    this.props.navigation.push('MessageList', {
      group: group
    })
    console.log('hi')
  }

  render() {
    return (
      <View style={{ ...SpacingStyles.container }}>
        <FlatList
          data={this.state.groups}
          renderItem={({ item }) =>
            <Group
              comment={item.comment}
              title={item.group}
              user={item.user}
              onPressButton={() => this.goToGroup(item.group)}
              />
          }
          keyExtractor={item => item.comment}
        />
      </View>
    )
  }
}

export default GroupScreen;