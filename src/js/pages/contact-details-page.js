import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

import {loadCurrContact, saveContact, saveUser} from '../modules/contact/action.js';

import {sendMoney, loadMoves} from '../modules/move/action.js';

import MoveList from '../cmps/move-list.js';

class ContactDetails extends React.Component {

    state = {
        contact: null,
        amountOfMoneyToSend: 0
    }

    get movesToShow() {
        var contact = this.state.contact;
        if (!contact) return [];
        return this.props.moves.filter(move => move.toUser._id === contact._id || 
                                        move.fromUser._id === contact._id);
    }

    render() {
        var {contact} = this.state;
        var user = this.props.loggedUser;
        return contact && 
            
            <main className="main-content">
                <h1>Contact</h1>
                <Link to={`/contact/edit/${contact._id}`}>Edit</Link>
                <div className="info">
                    <h3>Name: {contact.name}</h3>
                    <h3>Email: {contact.email}</h3>
                    <h3>Phone: {contact.phone}</h3>
                    <h3>Coins: {contact.coins}</h3>
                </div>
                {
                user &&
                <section>
                    <h3>Send some money?</h3>
                    <h4>you have: {user.coins}</h4>
                    <form onSubmit={ev => this.sendMoney(ev)}>
                        <input min="0" max={user.coins} value={this.state.amountOfMoneyToSend} onChange={ev => this.updateAmount(ev)} type="number"/>
                    </form>
                </section>
                }
                <h4>Moves with contact:</h4>
                <MoveList moves={this.movesToShow}></MoveList>

            </main>
    }

    async sendMoney(ev) {
        ev.preventDefault();
        var loggedUser = this.props.loggedUser;
        var {contact, amountOfMoneyToSend} = this.state;

        if (!loggedUser || amountOfMoneyToSend === 0) return;

        await this.props.sendMoney(loggedUser, contact, amountOfMoneyToSend);
        await this.props.saveUser(loggedUser);
        this.loadContact();
    }

    updateAmount(ev) {
        var loggedUser = this.props.loggedUser;
        var amount = +ev.target.value;
        if (amount > loggedUser.coins || amount < 0) {
            return;
        }
        this.setState({amountOfMoneyToSend: amount});
    }

    async loadContact() {
        var {_id} = this.props.match.params;
        await this.props.loadCurrContact(_id);
        await this.props.loadMoves();

        var contact = JSON.parse(JSON.stringify(this.props.currContact));
        this.setState({contact});
    }

    async componentDidMount() {
        this.loadContact();
    }

    async componentDidUpdate(prevProps, prevState) {
        if (prevProps.match.params._id !== this.props.match.params._id) {
            this.loadContact();
        }
    }
}



const mapStateToProps = state => {
    return {
        currContact: state.contact.currContact,
        loggedUser: state.contact.loggedUser,
        moves: state.move.moves
    }
}

const mapDispatchToProps = {loadCurrContact, saveContact, sendMoney, saveUser, loadMoves};

export default connect(mapStateToProps, mapDispatchToProps)(ContactDetails);