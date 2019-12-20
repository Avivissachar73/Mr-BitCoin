import React from 'react';

import {connect} from 'react-redux';


import {Link} from 'react-router-dom';

function AppHeader(props) {

    return (
        <header className="flex align-center space-between wrap width-all main-header">
            <h1>Mr. BitCoin</h1>
            {props.user && props.user.username}
            <ul className="main-nav clean-list flex wrap">
                <li><Link to="/">Home</Link></li> | 
                <li><Link to="/contact">Contacts</Link></li> |
                <li><Link to="/signup">Sign up</Link></li> 
            </ul>
        </header>
    )
}



const mapStateToProps = state => {
    return {
        user: state.contact.loggedUser
    }
}

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(AppHeader);