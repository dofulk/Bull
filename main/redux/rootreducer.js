import { ADD_MESSAGE, CHANGE_NAME, CONNECTED, DISCONNECTED } from './actions';
import { combineReducers } from 'redux';
import io from'socket.io-client'

const defaultValues = {
    user: {
        name: 'Dom Fulk',
    },
    socket: {
        isConnected: false,
        socketio: io('http://10.0.2.2:3000')
    },
    chatMessages: {
        top: [{
            message: 'hi',
            user: 'dom',
            date: 1572545207,
            hearts: 1,
            _id: 1
        }]
    },
    outgoingMessages: [],

}

const userReducer = (state = defaultValues.user, action) => {
    switch (action.type) {
        case CHANGE_NAME:
            return Object.assign({}, state, {
                name: action.payload
            })
        default:
            return state
    }
}

const socketReducer = (state = defaultValues.socket, action) => {
    switch (action.type) {
        case CONNECTED:
            return Object.assign({}, state, {
                isConnected: true
            });
        case DISCONNECTED:
            return Object.assign({}, state, {
                isConnected: false
            })
        default:
            return state
    }
}

const chatMessagesReducer = (state = defaultValues.chatMessages, action) => {
    switch (action.type) {
        case ADD_MESSAGE:
            return {
                ...state,
                top: state.top.concat(action.payload)
            };


        default:
            return state;
    }
}


const rootReducer = combineReducers({
    user: userReducer,
    socket: socketReducer,
    chatMessages: chatMessagesReducer,
})


export default rootReducer