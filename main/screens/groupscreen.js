import React from 'react';
import { View } from 'react-native';
import { SpacingStyles } from '../styles/index'
import Group from '../components/group'
import { FlatList } from 'react-native-gesture-handler';

class GroupScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      groups: [
        { comment: "Hello", title: "the worst group ever", user: "Dom" },
        { comment: "Hello. Am I a participant in the world or am I just a passive spectator to life?", title: "the best group ever", user: "Dom" }
      ],
    }
  };

  render() {
    return (
      <View style={{ ...SpacingStyles.container}}>
        <FlatList
          data={this.state.groups}
          renderItem={({ item }) => <Group comment={item.comment} title={item.title} user={item.user}></Group>}
          keyExtractor={item => item.comment}
        />
      </View>
    )
  }
}

export default GroupScreen;