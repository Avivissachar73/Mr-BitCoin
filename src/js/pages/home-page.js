import React from 'react';
import {connect} from 'react-redux';

import {loadMoves} from '../modules/move/action.js';
import {loadLoggedUser} from '../modules/contact/action.js';

import MoveList from '../cmps/move-list.js';

class HomePage extends React.Component {

    get movesToShow() {
        var user = this.props.user;
        if (!user) return [];
        return this.props.moves.filter(move => move.toUser._id === user._id || 
                                               move.fromUser._id === user._id);
    }

    async componentDidMount() {
        console.log('mounted, user:', this.props.user);
        var user = await this.props.loadLoggedUser();
        // if (!this.props.user) this.props.history.push('/signup');
        if (!user) this.props.history.push('/signup');
        this.props.loadMoves();
    }

    render() {
        var user = this.props.user;

        return user && <main className="main-content home-page flex column align-center space-around">
                {/* <h1>Home page</h1> */}
                <div className="info">
                    <h2>Hello, {user.username}</h2>
                    <h3>You now have: {user.coins}$</h3>
                </div>
                <div className="flex column align-center">
                    <h3>Your moves:</h3>
                    <MoveList moves={this.movesToShow}></MoveList>
                </div>
            </main>
    }
}


var mapedStates = state => {
    return {
        moves: state.move.moves,
        user: state.contact.loggedUser
    }
}

var mapedDispatches = {loadMoves, loadLoggedUser};

export default connect(mapedStates, mapedDispatches)(HomePage);