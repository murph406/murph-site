import React, { Component } from 'react';
import {
  BrowserRouter,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';

import { createStore, applyMiddleware } from 'redux';
import { Provider, connect } from 'react-redux';
import thunk from 'redux-thunk';
import MainReducer from './redux/main-reducer.js';

import Home from './Home';
import NotFound from './NotFound';
import Nav from './components/Nav';
import Projects from './components/Projects';
import ProjectContainer from './components/projects/ProjectContainer';
import Login from './components/Login';
import Footer from './components/Footer';
import ScrollToTop from './ScrollToTop';
import { ProjectDetails } from './components/data/data';

class App extends Component {
  store = createStore(MainReducer, applyMiddleware(thunk));

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    }
  }

  componentDidUpdate() {
    window.scrollTo(0, 0);
    console.log('updated in app js')
  }

  render() {
    const { isAuthenticated, location } = this.props

    return (
      <Provider store={this.store}>
        <BrowserRouter>
          <ScrollToTop location={location}>
            <div>
              <Nav />
              <Switch>
                <Route exact path="/" render={() => {
                  if (!isAuthenticated) {
                    return <Redirect to="/login" push />;
                  } else if (isAuthenticated) {
                    return <Home />;
                  }
                }
                } />
                <Route exact path="/projects" render={({ match }) => (
                  <div>
                    <Projects location={location} />
                  </div>
                )} />





                {ProjectDetails.map((project, index) => {
                  console.log("HMMMM O SEE IOT ", project)
                  return (
                    <Route exact path={"/projects/" + project.slug} render={() => (
                      <ProjectContainer data={project} />
                    )} />
                  )
                })}
                <Route exact path="/login" render={() => {
                  if (!isAuthenticated) {
                    return <Login />;
                  } else if (isAuthenticated) {
                    return <Home />;
                  }
                }
                } />
                <Route component={NotFound} />
              </Switch>
              <Footer />
            </div>
          </ScrollToTop>
        </BrowserRouter>
      </Provider>
    );
  }
}

var mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.loggedIn
  }
}

export default connect(mapStateToProps)(App);