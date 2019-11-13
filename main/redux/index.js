import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import io from 'socket.io-client'
import rootReducer from './rootreducer'
import thunk from 'redux-thunk'



const store = createStore(rootReducer, applyMiddleware(thunk));



// store.dispatch(handleSocket)



export default store;