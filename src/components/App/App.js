import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Nav from '../Nav/Nav';
import LandingPage from '../LandingPage/LandingPage';
import HomePage from '../HomePage/HomePage';
import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';
import CreateEventPage from '../CreateEventPage/CreateEventPage';
import MyAccountPage from '../MyAccountPage/MyAccountPage';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import './App.css';
import PopArtContext from '../../context/PopArtContext';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';
import PublicOnlyRoute from '../Utils/PublicOnlyRoute';
import PrivateRoute from '../Utils/PrivateRoute';
import TokenService from '../../services/token-service';
import EventsApiService from '../../services/events-api-service';
import UsersApiService from '../../services/users-api-service';
import RequestorsApiService from '../../services/requestors-api-service';

class App extends React.Component {
  state = {
    events: [],
    error: null,
    currentUser: null,
    userRequests: null,
    loggedIn: TokenService.hasAuthToken()
      ? true
      : false
  }

  setLoggedIn = () => {
    this.setState({
      loggedIn: TokenService.hasAuthToken()
        ? true
        : false
    })
  }

  setError = (err) => {
    this.setState({
      error: err.error
    })
  }

  setEvents = events => {
    this.setState({
      events
    })
  }

  addEvent = event => {
    this.setState([
      ...this.state.events,
      event
    ])
  }


  setLoggedInUser = user => {
    this.setState({
      currentUser: user
    })
  };

  clearUserRequests = () => {
    this.setState({
      userRequests: null,
    })
  }

  setUserRequests = () => {
    RequestorsApiService.getAllRequests()
      .then(result => {
        this.setState({
          userRequests: result
        })
      })
      .catch((e) => this.context.setError(e))
  };

  // findCurrentUser = () => {
  //   UsersApiService.getLoggedInUser()
  //       .then(res => {
  //         return res;
  //       })
  //       .catch((e) => this.setError(e));
  //   }


  componentDidMount() {
    // window.scrollTo(0, 0);
    EventsApiService.archiveEvents()
      .then((res) => {
        return null
      })
      .catch((e) => this.setError(e));

    if (this.state.loggedIn) {
      UsersApiService.getLoggedInUser()
        .then(res => {
          this.setLoggedInUser(res);
        })
        .catch((e) => this.setError(e));

      RequestorsApiService.getAllRequests()
        .then(result => {
          this.setState({
            userRequests: result
          })
        })
        .catch((e) => this.context.setError(e));

        this.setUserRequests();
    };
  };


  render() {
    return (
      <PopArtContext.Provider value={{
        events: this.state.events,
        error: this.state.error,
        setError: this.setError,
        setEvents: this.setEvents,
        addEvent: this.addEvent,
        setLoggedIn: this.setLoggedIn,
        loggedIn: this.state.loggedIn,
        setLoggedInUser: this.setLoggedInUser,
        currentUser: this.state.currentUser,
        userRequests: this.state.userRequests,
        setUserRequests: this.setUserRequests,
        clearUserRequests: this.clearUserRequests
      }} >
        <div className='App'>
          <nav>
            <Nav />
          </nav>
          <main className='App'>
            <header>
              <h1>Pop Art</h1>
            </header>
            {this.state.error && <p className='red'>There was an error! Oh no!</p>}
            <ErrorBoundary>
              <Switch>
                <Route exact path='/' component={LandingPage} />
                <Route path='/home' component={HomePage} />
                <PublicOnlyRoute path='/login' component={LoginPage} />
                <PublicOnlyRoute path='/register' component={RegisterPage} />
                <PrivateRoute path='/create-event' component={CreateEventPage} />
                <PrivateRoute path='/my-account' component={MyAccountPage} />
                <Route component={NotFoundPage} />
              </Switch>
            </ErrorBoundary>
          </main>
          <footer>
            <p> to return to landing page click <Link to='/'>Here</Link></p>
          </footer>
        </div>
      </PopArtContext.Provider>
    );
  }
}

export default App;
