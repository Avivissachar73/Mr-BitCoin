import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

import ContactList from '../cmps/contact-list.js';
import ContactFilter from '../cmps/contact-filter.js';

import contactService from '../modules/contact/ContactService.js';

import {loadContacts, removeContact} from '../modules/contact/action.js';


class ContactPage extends React.Component {

    state = {
        // contacts: null,
        filterBy: {
            searchStr: ''
        }
    }
    
    get contactsToShow() {
        var filterBy = this.state.filterBy;
        // var contacts = this.state.contacts;
        var contacts = this.props.contacts;
        return contacts.filter(contact => {
            for (let key in contact) {
                if (typeof(contact[key]) === 'string' && contact[key].toLowerCase().includes(filterBy.searchStr.toLowerCase())) {
                    return true;
                }
            }
            return false;
        })
    }

    render() {
        return this.props.contacts &&
        
            <main className="main-content contact-page">
                <h1>Contacts</h1>
                <div>
                    <ContactFilter setFilter={this.setFilter}/>
                    <Link to="/contact/edit">Add contact</Link>
                </div>
                <ContactList contacts={this.contactsToShow} removeContact={this.removeContact}/>
            </main>
    }

    async componentDidMount() {
        // const contacts = await contactService.getContacts();
        // this.setState({contacts});
        this.props.loadContacts();
    }

    setFilter = filterBy => {
        this.setState({filterBy});
    }

    removeContact = (_id) => {
        // contactService.deleteContact(_id)
        //     .then(contacts => this.setState({contacts}));
        this.props.removeContact(_id);
    }
}




const mapStateToProps = state => {
    return {
        contacts: state.contact.contacts
    }
}

const mapDispatchToProps = {loadContacts, removeContact};

export default connect(mapStateToProps, mapDispatchToProps)(ContactPage);