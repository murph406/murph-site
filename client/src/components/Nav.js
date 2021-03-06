import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { ProjectDetails } from './data/data'

class Nav extends Component {
  constructor(props) {
    super(props);

    this._toggleNav = this._toggleNav.bind(this);
    this.hideNav = this.hideNav.bind(this);
    this.listHover = this.listHover.bind(this);
    this.homeButton = this.homeButton.bind(this);

    this.state = {
      visibility: 'hidden',
      listHover: 'not-hover',
      isAuthenticated: ''
    }
  }

  _toggleNav(e) {
    this.setState({ visibility: 'show' });
    if (this.state.visibility === 'hidden') {
      this.setState({ visibility: 'show' });
    } else {
      this.setState({ visibility: 'hidden' });
    }
  }

  hideNav() {
    this.setState({ visibility: 'hidden' });
  }

  listHover(e) {
    this.setState({ listHover: 'is-hover' });
    if (this.state.listHover === 'not-hover') {
      this.setState({ listHover: 'is-hover' });
    } else {
      this.setState({ listHover: 'not-hover' });
    }
  }

  homeButton() {
    let { visibility } = this.state

    if (visibility === 'show') {
      this.setState({ visibility: 'hidden' });
    }
  }

  render() {
    let { isAuthenticated } = this.props;
    let { visibility, listHover } = this.state

    if (isAuthenticated) {
      return (
        <header>
          <div className="logo">
            <NavLink onClick={this.homeButton} to="/">Ryan Murphy</NavLink>
          </div>
          <div className="hamburger-container clearfix" onClick={this._toggleNav}>
            <div className={"hamburger clearfix " + visibility}>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
          <div className={"nav " + (visibility)}>
            <div className="flex">
              <div className="flex-item">
                <ul className={"nav-list " + (listHover)} onMouseEnter={this.listHover} onMouseLeave={this.listHover}>
                  {ProjectDetails.map((project, index) => {
                    const { client, slug } = project
                    return (
                      <li>
                        <NavLink onClick={this.hideNav} to={"/projects/" + slug}>
                          {client}
                        </NavLink>
                      </li>
                    )
                  })}
                </ul>
              </div>
            </div>
          </div>
        </header>
      );
    } else if (!isAuthenticated) {
      return (
        <header>
          <div className="logo">
            <NavLink onClick={this.homeButton} to="/">Ryan Murphy.</NavLink>
          </div>
        </header>
      );
    }
  }
}

var mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.loggedIn
  }
}

export default connect(mapStateToProps)(withRouter(Nav));