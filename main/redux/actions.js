import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';


export const ADD_MESSAGE = 'ADD_MESSAGE'
export const ADD_GROUP = 'ADD_GROUP'
export const CHANGE_NAME = 'CHANGE_NAME'
export const CONNECTEDDISCONNECTED = 'CONNECTED'
export const DISCONNECTED = 'DISCONNECTED'
export const ADD_PHOTO = 'ADD_PHOTO'
export const ADD_USER = 'ADD_USER'
export const CHANGE_GROUP_RECENT = 'CHANGE_GROUP_RECENT'

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

export function chageGroupRecent(data) {
    return {
        type: CHANGE_GROUP_RECENT,
        payload: data
    }
}


export function changeName(data) {
    return {
        type: CHANGE_NAME,
        payload: data
    }
}

export function addUser(data) {
    return {
        type: ADD_USER,
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

// SERVER CALLS


export const getMessages = (socket) => {
    return dispatch => {
        socket.on('message', res => { dispatch(addMessage(res)) }
        )
        socket.on('image_message', res => { dispatch(addMessage(res)) }
        )
    }
}

export const getGroups = () => {
    return async dispatch => {
        token = await getToken()
        axios({
            method: 'get',
            url: 'http://10.0.2.2:3000/getgroups',
            headers: {
                Authorization: token
            }
        }).then(res => {
            console.log(res)
        }).catch(err => console.log(err))
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
            }).catch(err => console.log(err))
    }
}

export const addNewMessage = message => {
    return async () => {
        token = await getToken()
        axios({
            method: 'post',
            url: 'http://10.0.2.2:3000/message',
            headers: {
                Authorization: token
            },
            data: message
        }).then(res => {
            console.log(res)
        }).catch(err => console.log(err))
    }
}

export const addNewGroup = (group) => {
    return async dispatch => {
        token = await getToken()
        axios({
            method: 'post',
            url: 'http://10.0.2.2:3000/group',
            headers: {
                Authorization: token
            },
            data: group
        }).then(res => {
            console.log(res)
            dispatch(addGroup(
                {
                    comment: res.data.comment,
                    name: res.data.name,
                    user: res.data.user,
                    users: res.data.userId,
                    id: res.data.groupId
                }))
        })

    }
}

export const addNewUser = (user) => {
    return dispatch => {
        axios({
            method: 'post',
            url: 'http://10.0.2.2:3000/users',
            data: user
        }).then(res => {
            storeToken(res.data.token)
            dispatch(addUser(res.data.user))
        }).catch(err => console.log(err))
    }
}

export const addNewPhotoMessage = (image, message) => {
    return async dispatch => {

        let token = await getToken()
        let imageFormObj = new FormData();

        imageFormObj.append('image', {
            uri: image,
            name: 'image.jpg',
            type: 'image/jpg'
        });
        axios({
            method: 'post',
            url: 'http://10.0.2.2:3000/upload',
            data: imageFormObj,
            headers: {
                'accept': 'application/json',
                'content-type': 'multipart/form-data',
                Authorization: token,
            }
        }).then(res => {
            console.log(res)
            let newMessage = Object.assign({}, message, {
                imgId: res.data.path
            })
            dispatch(addNewMessage(newMessage))
        }).catch((err) => console.log(err))
    }
}

const storeToken = async (token) => {
    try {
        await AsyncStorage.setItem("token", token);
    } catch (error) {
        console.log("Something went wrong", error);
    }
}

const getToken = async () => {
    try {
        const value = await AsyncStorage.getItem("token")
        return value
    } catch (error) {
        console.log("Something went wrong", error);
    }

    console.log('Done.')
}