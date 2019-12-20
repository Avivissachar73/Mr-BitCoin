import React from 'react';

// import {Route} from 'react-router-dom';

import {connect} from 'react-redux';

// import contactService from '../modules/contact/ContactService.js';

import {loadCurrContact, saveContact} from '../modules/contact/action.js';

class ContactEdit extends React.Component {
    state= {
        contactToEdit: null
    }

    saveContant = async (ev) => {
        ev.preventDefault();
        // contactService.saveContact(this.state.contactToEdit)
        //     .then(() => this.props.history.push('/contact'));
        await this.props.saveContact(this.state.contactToEdit);
        this.props.history.push('/contact');
    }

    updateUontact = (ev, prop) => {
        var contact = this.state.contactToEdit;
        contact[prop] = ev.target.value;
        this.setState({contactToEdit: contact});
    }

    async componentDidMount() {
        var {_id} = this.props.match.params;
        // var contact = JSON.parse(JSON.stringify(await contactService.getContactById(_id)));
        // this.setState({contactToEdit: contact});
        // console.log('edit was mounted, contact:', contact);
        await this.props.loadCurrContact(_id);
        var contactToEdit = JSON.parse(JSON.stringify(this.props.currContact));
        this.setState({contactToEdit});
    }

    render() {
        var contact = this.state.contactToEdit;
        return contact &&
            <main className="main-content flex justify-center">
                <form onSubmit={this.saveContant} className="flex column align-center justify-center">
                    <input value={contact.name} type="text" placeholder="Name" onChange={(ev) => this.updateUontact(ev, 'name')}/>
                    <input value={contact.email} type="text" placeholder="Email" onChange={(ev) => this.updateUontact(ev, 'email')}/>
                    <input value={contact.phone} type="text" placeholder="Phone" onChange={(ev) => this.updateUontact(ev, 'phone')}/>
                    <button>Save</button>
                </form>
            </main>
    }
}



const mapStateToProps = state => {
    return {
        currContact: state.contact.currContact
    }
}

const mapDispatchToProps = {loadCurrContact, saveContact};

export default connect(mapStateToProps, mapDispatchToProps)(ContactEdit);