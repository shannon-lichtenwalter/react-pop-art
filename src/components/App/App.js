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
import EventPage from '../EventPage/EventPage';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import PopArtContext from '../../context/PopArtContext';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';
import PublicOnlyRoute from '../Utils/PublicOnlyRoute';
import PrivateRoute from '../Utils/PrivateRoute';
import TokenService from '../../services/token-service';
import EventsApiService from '../../services/events-api-service';
import UsersApiService from '../../services/users-api-service';
import RequestorsApiService from '../../services/requestors-api-service';
import './App.css';

class App extends React.Component {
  state = {
    events: [],
    error: null,
    currentUser: null,
    userRequests: [],
    userHostedEvents: [],
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
  
  clearError = () => {
    this.setState({
      error: null,
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
    this.setState({
      events:[
      ...this.state.events,
      event
    ],
    userHostedEvents: [
      ...this.state.userHostedEvents,
      event
    ]})
  }

  deleteEvent = event_id => {
    const updatedEvents = this.state.events.filter(event => event.id !== event_id);
    this.setState({
      events: updatedEvents
    });

    const updatedUserHostedEvents = this.state.userHostedEvents.filter(event => event.id !== event_id);
    this.setState({
      userHostedEvents: updatedUserHostedEvents
    });
  }


  setLoggedInUser = user => {
    this.setState({
      currentUser: user
    })
  };

  clearUserRequests = () => {
    this.setState({
      userRequests: [],
    })
  }

  clearUserHostedEvents = () => {
    this.setState({
      userHostedEvents: [],
    })
  }

  setUserRequests = () => {
    RequestorsApiService.getAllRequests()
      .then(result => {
        this.setState({
          userRequests: result
        })
      })
      .catch((e) => this.setError(e))
  };

  removeFilterFromEvents = () => {
    EventsApiService.getEvents()
          .then(res => {
            this.setEvents(res);
          })
  }

  getAllHostedEvents = () => {
    EventsApiService.getAllEventsHostedByUser()
      .then(result => {
        this.setState({
          userHostedEvents: result
        })
      })
      .catch((e) => this.setError(e))
  }

  updateSlotsAvailable = (event_id) => {
    const allEvents = this.state.events;
    const eventIndex = this.state.events.findIndex(event => event.id === event_id);
    const event = (this.state.events[eventIndex]);
    if (event.slots_available > 0) {
      event.slots_available = (parseInt(event.slots_available) - 1);
      allEvents[eventIndex] = event;
      this.setState({
        events: allEvents
      })
    }
  }

  componentDidMount() {
    window.scrollTo(0, 0);

    // Once the component mounts, it will first
    // get all of the events from the database and 
    // if the event is from a past date, a post request
    // will be sent to update the event so that archived is true.
    // Then, a second get request will get all of the events where
    // archived is not true so that the app only displays upcoming events.  

    EventsApiService.archiveEvents()
      .then((res) => {
        return null
      })
      .then(() => {
        EventsApiService.getEvents()
          .then(res => {
            this.setEvents(res);
          })
      })
      .catch((e) => this.setError(e));

      //If there is a logged in user, then an API request
      // will be made to get information about the current user
      //The app will save the current user to state.

    if (this.state.loggedIn) {
      UsersApiService.getLoggedInUser()
        .then(res => {
          this.setLoggedInUser(res);
        })
        .catch((e) => this.setError(e));
//Then API requests will be made to get all of the events 
//that the user has requested to book.
      this.setUserRequests();
//Lastly, the state will be set with all of the event that
// the user is hosting. 
      this.getAllHostedEvents();
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
        userHostedEvents: this.state.userHostedEvents,
        setUserRequests: this.setUserRequests,
        clearUserRequests: this.clearUserRequests,
        deleteEvent: this.deleteEvent,
        getAllHostedEvents: this.getAllHostedEvents,
        clearUserHostedEvents: this.clearUserHostedEvents,
        updateSlotsAvailable: this.updateSlotsAvailable,
        removeFilterFromEvents: this.removeFilterFromEvents,
        clearError: this.clearError
      }} >
        <div className='App'>
          <nav>
            <Nav />
          </nav>
          <main className='App'>
            <header>
              <div className='badge'>
                <Link to='/home'><h1 className='mainLogo'>Pop Art</h1></Link>
              </div>
              
            </header>
            {this.state.error && <p className='red'>There was an error! Oh no!</p>}
            <ErrorBoundary>
              <Switch>
                <Route exact path='/' component={LandingPage} />
                <Route path='/home' component={HomePage} />
                <PublicOnlyRoute path='/login' component={LoginPage} />
                <PublicOnlyRoute path='/register' component={RegisterPage} />
                <PrivateRoute path='/event/:eventId' component={EventPage} />
                <PrivateRoute path='/create-event' component={CreateEventPage} />
                <PrivateRoute path='/my-account' component={MyAccountPage} />
                <Route component={NotFoundPage} />
              </Switch>
            </ErrorBoundary>
          </main>
        </div>
      </PopArtContext.Provider>
    );
  }
}

export default App;
