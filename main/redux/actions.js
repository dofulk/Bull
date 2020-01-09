import { objectExpression } from '@babel/types'

const axios = require('axios')


export const ADD_MESSAGE = 'ADD_MESSAGE'
export const ADD_GROUP = 'ADD_GROUP'
export const CHANGE_NAME = 'CHANGE_NAME'
export const CONNECTEDDISCONNECTED = 'CONNECTED'
export const DISCONNECTED = 'DISCONNECTED'
export const ADD_PHOTO = 'ADD_PHOTO'

export function addMessage(data) {
    return {
        type: ADD_MESSAGE,
        payload: data
    }
}

export function addGroup(data) {
    return {
        type: ADD_GROUP,
        payload: data
    }
}

export function addPhoto(data) {
    return {
        type: ADD_PHOTO,
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
        socket.on('image_message', res => { dispatch(addMessage(res)) }
        )
    }
}

export const loadPhoto = (id) => {
    return dispatch => {
        axios.get('http://10.0.2.2:3000/loadphoto', {
            params: {
                id: id
            }
        })
        .then(res => {
            console.log(res.data)
            dispatch(addPhoto(res.data))
        }).catch((err) => { console.log(err) })
    }
}

export const addNewMessage = (socket, message) => {
    return () => {
        socket.emit('message', message)
    }
}

export const addNewGroup = (group) => {
    return dispatch => {
        dispatch(addGroup(group))
    }
}

export const addNewPhotoMessage = (image, message, socket) => {
    return () => {
        let imageFormObj = new FormData();

        imageFormObj.append('file', {
            uri: image,
            type: 'image/jpeg',
        });
        axios.post('http://10.0.2.2:3000/upload', imageFormObj)
            .then(res => {
                Object.assign(message, {imgId: res.data})
                socket.emit('message', message)
            }).catch((err) => { console.log(err) })
    }
}