import React from 'react';
import { View } from 'react-native';
import { SpacingStyles, ButtonStyles } from '../styles/index'
import Group from '../components/group'
import { FlatList } from 'react-native-gesture-handler';
import { FAB } from 'react-native-paper';
import { connect } from 'react-redux'

class GroupScreen extends React.Component {
  static navigationOptions = {
    headerShown: false
  }


  goToGroup = (group) => {
    this.props.navigation.push('MessageList', {
      group: group
    })
  }

  addgroup = () => {
   this.props.navigation.push('AddGroup')
  }

  render() {
    return (
      <View style={{ ...SpacingStyles.container }}>
        <FlatList
          data={(this.props.groups)}
          renderItem={({ item }) =>
            <Group
              comment={item.comment}
              title={item.name}
              user={item.user}
              onPressButton={() => this.goToGroup(item.name)}
            />
          }
          keyExtractor={item => item.id}
        />
        <FAB
          style={{ ...ButtonStyles.fab, bottom: 0 }}
          icon="add"
          onPress={() => this.addgroup()}
        />
      </View>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    groups: state.groups
  }
}

export default connect(mapStateToProps)(GroupScreen);