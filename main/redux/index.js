import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import io from 'socket.io-client'
import rootReducer from './rootreducer'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'

const logger = createLogger({
    collapsed: true
})



const store = createStore(rootReducer, applyMiddleware(thunk, logger));



// store.dispatch(handleSocket)



export default store;