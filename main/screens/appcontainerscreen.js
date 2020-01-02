import React from 'react';
import TopScreen from './topscreen';
import GroupScreen from './groupscreen';
import SettingsScreen from './settingsscreen';
import PhotoPreviewScreen from './photopreviewscreen';
import CameraScreen from './camerascreen';
import MessageListScreen from './messagelistscreen';
import SearchScreen from './searchscreen'
import PhotoModal from './photomodal'
import EditSettingsScreen from './editsettingsscreen';
import { getMessages } from '../redux/actions'
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';






const SettingsStack = createStackNavigator({
    Settings: {
        screen: SettingsScreen,
        navigationOptions: {
            header: null
        }
    },
    EditSettings: {
        screen: EditSettingsScreen,
    },
},
    {
        headerMode: 'screen',
        navigationOptions: {
            headerVisible: true,
        }
    }
)



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
                    <Icon size={25} name="md-person" style={{ color: tintColor }} />
                )
            }
        },
        Search:
        {
            screen: SearchScreen,
            navigationOptions:
            {
                tabBarLabel: 'Search',
                tabBarIcon: ({ tintColor, focused }) => (
                    <Icon size={25} name="md-search" style={{ color: tintColor }} />
                )
            }
        },
        Settings:
        {
            screen: SettingsStack,
            navigationOptions:
            {
                tabBarLabel: 'Settings',
                tabBarIcon: ({ tintColor, focused }) => (
                    <Icon size={25} name="md-settings" style={{ color: tintColor,  }} />
                )
            }
        },
    },
    {
        initialRouteName: "Top",
        activeTintColor: "#ff5973",
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