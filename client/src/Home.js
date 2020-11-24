import React, { Component } from 'react';
import HomeHero from './components/home/HomeHero';
import Projects from './components/Projects';
import { connect } from 'react-redux';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visibility: 'hide-view'
    }
  }

  componentDidMount() {
    setTimeout(function () {
      this.setState({ visibility: 'show-view' });
    }.bind(this), 400);
    window.scrollTo(0, 0);

    this.checkSession();
  }

  checkSession() {
    const userID = localStorage.getItem('userID');
    const sessionID = localStorage.getItem('sessionID');
    if (userID === null || sessionID === null) {
      // Go to login page
      console.log('login page');
    }
  }

  render() {
    let { visibility } = this.state
    return (
      <div className={"transition " + (visibility)}>
        <HomeHero />
        <Projects />
      </div>
    );
  }
}

var mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.loggedIn
  }
}

export default connect(mapStateToProps)(Home);
