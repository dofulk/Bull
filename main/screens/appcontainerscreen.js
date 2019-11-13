import React from 'react';
import TopScreen from './topscreen';
import GroupScreen from './groupscreen';
import SettingsScreen from './settingsscreen';
import PhotoScreen from './photoscreen';
import PhotoPreviewScreen from './photopreviewscreen';
import CameraScreen from './camerascreen';
import { getMessages } from '../redux/actions'
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';

const TopStack = createStackNavigator({
    Top: {
        screen: TopScreen,
    },

    Photo: {
        screen: PhotoScreen,
    }
},
    {
        headerMode: 'none',
        navigationOptions: {
            headerVisible: false,
        }
    },
);

TopStack.navigationOptions = ({ navigation }) => {

    let tabBarVisible = true;

    let routeName = navigation.state.routes[navigation.state.index].routeName

    if (routeName == 'Photo') {
        tabBarVisible = false
    }

    return {
        tabBarVisible,
    }
}

const TabNavigator = createMaterialBottomTabNavigator(
    {
        Top:
        {
            screen: TopStack,
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
            screen: TopStack,
            navigationOptions:
            {
                tabBarLabel: 'Live',
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

    },

    Camera: {
        screen: CameraScreen,
    },
    PhotoPreview: {
        screen: PhotoPreviewScreen
    }
},
    {
        headerMode: 'none',
        navigationOptions: {
            headerVisible: false,
        }
    },
);


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