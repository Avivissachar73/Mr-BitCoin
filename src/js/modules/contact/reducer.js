// import {combineReducers} from 'redux';

const INITIAL_STATE = {
    currContact: null,
    loggedUser: null,
    contacts: []
}

export default function contactReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case 'SET_LOGGED_USER':
            return {
                ...state,
                loggedUser: action.loggedUser
            }
        case 'SET_CURR_CONTACT':
            return {
                ...state,
                currContact: action.currContact
            }
        case 'SET_CONTACTS':
            return {
                ...state,
                contacts: action.contacts
            }
        case 'SAVE_CONTACT':
            var contacts = state.contacts;
            var idx = contacts.find(currContact => currContact._id === action.contact._id);
            if (idx !== -1) contacts.splice(idx, 1, action.contact); 
            else contacts.unshift(action.contact);
            return {
                ...state,
                contacts: [...contacts]
            }
        case 'REMOVE_CONTACT': 
            var contacts = state.contacts;
            var idx = contacts.find(currContact => currContact._id === action._id);
            if (idx !== -1) contacts.splice(idx, 1);
            return {
                ...state,
                contacts: [...contacts]
            }
        default: 
            return state
    }
}