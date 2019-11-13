export const ADD_MESSAGE = 'ADD_MESSAGE'
export const CHANGE_NAME = 'CHANGE_NAME'
export const CONNECTEDDISCONNECTED = 'CONNECTED'
export const DISCONNECTED = 'DISCONNECTED'

export function addMessage(data) {
    return {
        type: ADD_MESSAGE,
        payload: data
    }
}




export function changeName(data) {
    return {
        type: CHANGE_NAME,
        payload: data
    }
}




export function connected(data) {
    return {
        type: CONNECTED,
        payload: data
    }
}



export function disconnected(data) {
    return {
        type: DISCONNECTED,
        payload: data
    }
}

// ASYNC W/ SOCKETS


export const getMessages = (socket) => {
    return dispatch => {
        socket.on('message', res => { dispatch(addMessage(res)) }
        )
    }
}

export const addNewMessage = (socket, message) => {
    return (dispatch) => {
        socket.emit('message', message)
    }
}