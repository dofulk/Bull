import React from 'react';
import TopScreen from './topscreen';
import LiveScreen from './livescreen';
import GroupScreen from './groupscreen';
import SettingsScreen from './settingsscreen';
import PhotoPreviewScreen from './photopreviewscreen';
import CameraScreen from './camerascreen';
import MessageListScreen from './messagelistscreen';
import PhotoModal from './photomodal'
import { getMessages } from '../redux/actions'
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';









const TabNavigator = createMaterialBottomTabNavigator(
    {
        Top:
        {
            screen: TopScreen,
            navigationOptions:
            {
                tabBarIcon: ({ tintColor, focused }) => (
                    <Icon size={25} name="md-star" style={{ color: tintColor }} />
                )
            },
        },
        Group:
        {
            screen: GroupScreen,
            navigationOptions:
            {
                tabBarLabel: 'Group',
                tabBarIcon: ({ tintColor, focused }) => (
                    <Icon size={25} name="md-globe" style={{ color: tintColor }} />
                )
            }
        },
        Live:
        {
            screen: CameraScreen,
            navigationOptions:
            {
                tabBarLabel: 'Camera',
                tabBarIcon: ({ tintColor, focused }) => (
                    <Icon size={25} name="md-camera" style={{ color: tintColor }} />
                )
            }
        },
        Settings:
        {
            screen: SettingsScreen,
            navigationOptions:
            {
                tabBarLabel: 'Settings',
                tabBarIcon: ({ tintColor, focused }) => (
                    <Icon size={25} name="md-settings" style={{ color: tintColor }} />
                )
            }
        },
    },
    {
        initialRouteName: "Top",
        activeColor: 'rgba(255,255,255, .87)',
        inactiveColor: 'rgba(255,255,255, .60)',
        barStyle: { backgroundColor: '#303030' },
        labeled: false,
    },
);

const CameraStack = createStackNavigator({
    Main: {
        screen: TabNavigator,
        navigationOptions: {
            header: null
        }
    },
    Camera: {
        screen: CameraScreen,
        navigationOptions: {
            header: null
        }
    },
    PhotoPreview: {
        screen: PhotoPreviewScreen,
        navigationOptions: {
            header: null
        }
    },
    MessageList: {
        screen: MessageListScreen,
    },
    Photo: {
        screen: PhotoModal,
        navigationOptions: {
            header: null
        }
    },
},
    {
        headerMode: 'screen',
        navigationOptions: {
            headerVisible: true,
        }
    }
);

CameraStack.navigationOptions = ({ navigation }) => {
    let header
    let routeName = navigation.state.routes[navigation.state.index].routeName

    if (routeName == 'Group') {
        header = null
    }
    return {
        header
    }
}


const AppContainer = createAppContainer(CameraStack);

class AppContainerScreen extends React.Component {

    componentDidMount() {
        this.props.getMessages(this.props.socket.socketio);
    }

    render() {
        return (
            <AppContainer></AppContainer>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        socket: state.socket

    }
}

const mapDispatchToProps = {
    getMessages
}

export default connect(mapStateToProps, mapDispatchToProps)(AppContainerScreen);