import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk'

import contactReducer from './js/modules/contact/reducer.js';
import moveReducer from './js/modules/move/reducer.js';

const rootReducer = combineReducers({
    contact: contactReducer,
    move: moveReducer
})

export default createStore(rootReducer, applyMiddleware(thunk));