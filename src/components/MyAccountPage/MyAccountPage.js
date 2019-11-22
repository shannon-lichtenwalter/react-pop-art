import React from 'react';
import { Link } from 'react-router-dom';
import PopArtContext from '../../context/PopArtContext';
// import UsersApiService from '../../services/users-api-service';
// import RequestorsApiService from '../../services/requestors-api-service';
// import EventsApiService from '../../services/events-api-service';
import RequestedEvents from '../RequestedEvents/RequestedEvents';
import HostedEvents from '../HostedEvents/HostedEvents';
import UsersApiService from '../../services/users-api-service';
import TokenService from '../../services/token-service';

class MyAccountPage extends React.Component {
  state = {
    user: this.context.currentUser,
    requests: this.context.userRequests,
    events: [],
    deletingAccount: false
  };

  static contextType = PopArtContext;

  // setUser = (user) => {
  //   this.setState({
  //     user
  //   })
  // }

  // deleteHostsEvent = (event_id) => {
  //   const updatedEvents = this.state.events.filter(event => event.id !== event_id);
  //   this.setState({
  //     events: updatedEvents
  //   });
  // }

  // getAllHostedEvents = () => {
  //   EventsApiService.getAllEventsHostedByUser()
  //     .then(result => {
  //       this.setState({
  //         events: result
  //       })
  //     })
  //     .catch((e) => this.context.setError(e))
  // }

  componentDidMount() {
    this.context.clearError();
    // UsersApiService.getLoggedInUser()
    //   .then(res => {
    //     this.setUser(res);
    //   })
    //   .catch((e) => this.context.setError(e));

    //   this.setState({
    //     requests: this.context.userRequests
    //   });

    //replacing this with context link from app
    // RequestorsApiService.getAllRequests()
    //   .then(result => {
    //     this.setState({
    //       requests: result
    //     })
    //   })
    //   .catch((e) => this.context.setError(e))

    // EventsApiService.getAllEventsHostedByUser()
    //   .then(result => {
    //     console.log(result);
    //     this.setState({
    //       events: result
    //     })
    //   })
    //   .catch((e) => this.context.setError(e))
    //this.getAllHostedEvents();
  }

  handleDeleteClicked = () => {
    this.setState({
      deletingAccount:true
    })
  }

  handleCancelDelete = () => {
    this.setState({
      deletingAccount:false
    })
  }

  deleteAccount = () => {
    UsersApiService.deleteAccount()
      .then(() => {
        TokenService.clearAuthToken();
    this.context.setLoggedIn();
    this.context.clearError();
    this.context.clearUserRequests();
    this.context.clearUserHostedEvents();
    this.context.removeFilterFromEvents();
    this.context.setLoggedInUser(null);
      })
      .catch((e) => this.context.setError)
  }

renderDeleteConfirmation = () => {
  return (
    <>
      <p>Warning, by deleting your account you will also be deleting all of your posted events and all of your event requests.</p>
      <h4>Are You Sure You Want to Delete?</h4>
      <button onClick ={()=> this.deleteAccount()}>yes, delete my account now</button>
      <button onClick={()=> this.handleCancelDelete()}>no, I changed my mind</button>
    </>
  )
}

  render() {
    const user = this.context.currentUser;
    
    return (
      <>
        <h2> Welcome back{user ? ', ' + user.username : ''} </h2>
        <section>
          <h2>Your Booking Requests</h2>
          {this.context.userRequests ? <RequestedEvents /> : ''}
        </section>

        <section>
          <h2>Your Hosted Events</h2>
          <Link to='/create-event'>
            <button>Create New Event</button>
          </Link>
          {this.context.userHostedEvents ? <HostedEvents /> : ''}
          {/* <ul>
          <li>{this.state.events[0].name} on {this.state.events[0].date}
            <button>Cancel Event</button>
          </li>
          <ul>
            <li>{this.state.events[0].requestors[0].username} has requested to book this event. Status: {this.state.events[0].requestors[0].booking_status}
              <button>Approve</button>
              <button>Deny</button>
            </li> 
            <li>John has requested to book this event
              <button>Approve</button>
              <button>Deny</button>
            </li>
            <li>Jane has requested to book this event
              <button>Approve</button>
              <button>Deny</button>
            </li>
          </ul>
  
  
        </ul>
   */}
        </section>

        <section>
        <h2>Account Options</h2>
        
          <button onClick={()=> this.handleDeleteClicked()}>Delete Account</button>
          {this.state.deletingAccount && this.renderDeleteConfirmation()}
      </section>
      </>
    )
  }
}

export default MyAccountPage;