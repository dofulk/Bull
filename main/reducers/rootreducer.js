const initState = {
    user: {
        name: 'Dom'
    }
}


const rootReducer = (state = initState, action) => {
    switch (action.type) {
        default:
            return state;
            break;
    }
}

export default rootReducer