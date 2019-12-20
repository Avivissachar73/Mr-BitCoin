import contactService from './ContactService.js';

export const loadContacts = () => {
    return async (dispatch) => {
        return dispatch(setContacts(JSON.parse(JSON.stringify(await contactService.getContacts()))))
    }
}
const setContacts = (contacts) => {
    return {type: 'SET_CONTACTS', contacts};
}



export const loadCurrContact = (_id) => {
    return async (dispatch) => {
        return dispatch(setCurrContact(JSON.parse(JSON.stringify(await contactService.getContactById(_id)))));
    }
}
const setCurrContact = (currContact) => {
    return {type: 'SET_CURR_CONTACT', currContact};
}



export const login = (loginInfo) => {
    return async (dispatch) => {
        return dispatch(setLoggedContact(await contactService.login(loginInfo)));
    }
}
export const saveUser = (user) => {
    return async (dispatch) => {
        return dispatch(setLoggedContact(await contactService.saveUser(user)));
    }
}
export const loadLoggedUser = () => {
    return async (dispatch) => {
        return dispatch(setLoggedContact(await contactService.getLoggedUser()));
    }
}
const setLoggedContact = (loggedUser) => {
    return {type: 'SET_LOGGED_USER', loggedUser};
}




export const saveContact = (contact) => {
    return async (dispatch) => {
        return dispatch(setSavedContact(await contactService.saveContact(contact)))
    }
}
const setSavedContact = (contact) => {
    return {type: 'SAVE_CONTACT', contact};
}

export const removeContact = (_id) => {
    return async (dispatch) => {
        await contactService.deleteContact(_id);
        return dispatch(setRemoveContact(_id));
    }
}
const setRemoveContact = (_id) => {
    return {type: 'REMOVE_CONTACT', _id};
}