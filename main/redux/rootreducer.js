import { ADD_MESSAGE, CHANGE_NAME, CONNECTED, DISCONNECTED, ADD_GROUP } from './actions';
import { combineReducers } from 'redux';
import io from 'socket.io-client'
import { objectExpression } from '@babel/types';

const defaultValues = {
    user: {
        name: 'Dom Fulk',
    },
    socket: {
        isConnected: false,
        socketio: io('http://10.0.2.2:3000')
    },
    chatMessages: [],
    groups: []

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

const groupsReducer = (state = defaultValues.groups, action) => {
    switch (action.type) {
        case ADD_GROUP:
            return [
                ...state,
                action.payload
            ]
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
                [action.payload.chat]: messagesReducer(state[action.payload.chat], action)
            }


        default:
            return state;
    }
}

const messagesReducer = (state = [], action) => {
    switch (action.type) {
        case ADD_MESSAGE:
            return [...state, action.payload]

        default:
            return state;
    }
}



const rootReducer = combineReducers({
    user: userReducer,
    chatMessages: chatMessagesReducer,
    socket: socketReducer,
    groups: groupsReducer
})


export default rootReducer