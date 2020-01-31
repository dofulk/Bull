import { ADD_MESSAGE, CHANGE_NAME, CONNECTED, DISCONNECTED, ADD_GROUP, ADD_PHOTO, CHANGE_GROUP_RECENT } from './actions';
import { combineReducers } from 'redux';
import io from 'socket.io-client'

const defaultValues = {
    user: {
        name: 'Guest',
    },
    socket: {
        isConnected: false,
        socketio: io('http://10.0.2.2:3000')
    },
    chatMessages: [],
    groups: [],
    photos: []

}

const userReducer = (state = defaultValues.user, action) => {
    switch (action.type) {
        case CHANGE_NAME:
            return Object.assign({}, state, {
                name: action.payload.username

            })
        default:
            return state
    }
}

const groupsReducer = (state = defaultValues.groups, action) => {
    switch (action.type) {
        case ADD_GROUP:
            return  [
                ...state,
                action.payload
            ]
        case CHANGE_GROUP_RECENT:
            return state.map((item) => {
                if (item.id !== action.payload.id) {
                    return item
                }
                return {
                    ...item,
                    ...action.payload
                }
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

const photosReducer = (state = defaultValues.photos, action) => {
    switch (action.type) {
        case ADD_PHOTO:
            let newArray = state.slice()
            newArray.splice(action.index, 0, action.payload)
            return newArray
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
    groups: groupsReducer,
    photos: photosReducer
})


export default rootReducer