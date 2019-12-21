import React from 'react';
import {connect} from 'react-redux';

import {loadMoves} from '../modules/move/action.js';

import MoveList from '../cmps/move-list.js';

class HomePage extends React.Component {

    get movesToShow() {
        var user = this.props.user;
        if (!user) return [];
        return this.props.moves.filter(move => move.toUser._id === user._id || 
                                               move.fromUser._id === user._id);
    }

    componentDidMount() {
        console.log('mounted, user:', this.props.user);
        if (!this.props.user) this.props.history.push('/signup');
        this.props.loadMoves();
    }

    render() {
        var user = this.props.user;

        return <main className="main-content home-page flex align-center justify-center">
                {/* <h1>Home page</h1> */}
                {user && <div>
                    <h2>Hello, {user.username}</h2>
                    <h3>You now have {user.coins} coins</h3>
                    <h3>Your moves:</h3>
                    <MoveList moves={this.movesToShow}></MoveList>
                </div> || <h2>Not logged in</h2>}
            </main>
    }
}


var mapedStates = state => {
    return {
        moves: state.move.moves,
        user: state.contact.loggedUser
    }
}

var mapedDispatches = {loadMoves};

export default connect(mapedStates, mapedDispatches)(HomePage);