import React from 'react';
import { Text, View } from 'react-native';
import { SpacingStyles, TextStyles } from '../styles/index'
import Group from '../components/group'
import { FlatList } from 'react-native-gesture-handler';

class GroupScreen extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      groups: [
        { comment: "Hello", title: "the worst group ever", user: "Dom Fulk"},
        { comment: "Hello. Am I a participant in the world or am I just a passive spectator to life?", title: "the best group ever", user: "Dom Fulk"}
      ],
    }
  };

    render() {
      return (
        <View style={{...SpacingStyles.container, flexDirection: "row"}}>
          <FlatList
          data={this.state.groups}
          numColumns={4}
          renderItem={({item}) => <Group comment={item.comment} title={item.title} user={item.user}></Group>}
          />       
           </View>
      )
    }
  }

  export default GroupScreen;