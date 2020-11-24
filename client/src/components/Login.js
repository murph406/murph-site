import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';

import Home from '../Home';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      password: '',
      error: false
    };

    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleEmailChange(event) {
    this.setState({ email: event.target.value });
  }

  handlePasswordChange(event) {
    this.setState({ password: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();

    let { dispatch } = this.props
    let password = event.target.elements[1].value;
    let data = { password: password };

    // if there is not a userID or sessionID, other components redirect back to login

    console.log(data)

    axios.post('/api/auth/login', data)
      .then((res) => {

        dispatch({ type: 'LOGIN' });

        localStorage.setItem('sessionID', "1");
        localStorage.setItem('userID', "2");

        console.log("Response", res.data)

      })
      .catch(error => {
        console.log("ERR", error);
        this.setState({ error: true })
      });
  }

  render() {
    const { password, error } = this.state;
    const isEnabled = password.length > 0;
    const { isAuthenticated } = this.props;

    if (isAuthenticated) {
      window.location.replace("/");
      return (
        <div>
          <Home />
        </div>
      );
    }

    return (
      <div>
        <form className="form" onSubmit={this.handleSubmit}>
          <div className="flex">
            <div className="flex-item">
              <input type="hidden" placeholder="Email" autoComplete="off" name="email" value="work@work.com" onChange={this.handleEmailChange} />
              <input type="password" placeholder="Password" autoComplete="off" name="password" onChange={this.handlePasswordChange} />
              {(error)
                ? <span class="error">Incorrect Password</span>
                : ''
              }
              <input disabled={!isEnabled} type="submit" value="Submit" />
            </div>
          </div>
        </form>
      </div>
    );
  }
}

var mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.loggedIn
  }
}

export default connect(mapStateToProps)(withRouter(Login));
