import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

import {login} from '../modules/contact/action.js';


class SignupPage extends React.Component {
    state= {
        loginInfo: {
            username: '',
            password: '',
        }
    }

    login = async (ev) => {
        ev.preventDefault();
        await this.props.login(this.state.loginInfo);
        this.props.history.push('/');
    }

    updateLoginInfo = (ev, prop) => {
        var loginInfo = this.state.loginInfo;
        loginInfo[prop] = ev.target.value;
        this.setState({loginInfo});
    }

    render() {
        var {loginInfo} = this.state;
        return loginInfo &&
            <main className="main-content flex justify-center signup-page">
                <form onSubmit={this.login} className="flex column align-center justify-center">
                    <input value={loginInfo.username} type="text" placeholder="User name" onChange={(ev) => this.updateLoginInfo(ev, 'username')}/>
                    <input value={loginInfo.password} type="text" placeholder="Password" onChange={(ev) => this.updateLoginInfo(ev, 'password')}/>
                    <button>Save</button>
                </form>
            </main>
    }
}




const mapStateToProps = state => {
    return {
        
    }
}

const mapDispatchToProps = {login};

export default connect(mapStateToProps, mapDispatchToProps)(SignupPage);