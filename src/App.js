import React from 'react';
import './App.css';

import AppHeader from './js/cmps/app-header.js';
import HomePage from './js/pages/home-page.js';
import ContactPage from './js/pages/contact-page.js';
import ContactEdit from './js/pages/contact-edit-page.js';
import ContactDetails from './js/pages/contact-details-page.js';
import signupPage from './js/pages/signup-page.js';

import {connect} from 'react-redux';

import {loadLoggedUser} from './js/modules/contact/action.js';

import {Route, Switch} from 'react-router-dom';

class App extends React.Component {

  render() {
    return (
      <div className="App">
        <AppHeader/>
        <Switch>
          <Route exact path="/" component={HomePage}/>
          <Route exact path="/contact" component={ContactPage}/>
          <Route exact path="/contact/edit/:_id?" component={ContactEdit}/>
          <Route exact path="/contact/:_id" component={ContactDetails}/>
          <Route exact path="/signup" component={signupPage}/>
        </Switch>
      </div>
    );
  }

  componentDidMount() {
    this.props.loadLoggedUser();
  }
}


const mapStateToProps = state => {
  return {
      currContact: state.contact.currContact,
      loggedUser: state.contact.loggedUser
  }
}

const mapDispatchToProps = {loadLoggedUser};

export default connect(mapStateToProps, mapDispatchToProps)(App);
