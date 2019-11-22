import React from 'react';
import { Link } from 'react-router-dom';
import PopArtContext from '../../context/PopArtContext';
// import UsersApiService from '../../services/users-api-service';
// import RequestorsApiService from '../../services/requestors-api-service';
// import EventsApiService from '../../services/events-api-service';
import RequestedEvents from '../RequestedEvents/RequestedEvents';
import HostedEvents from '../HostedEvents/HostedEvents';

class MyAccountPage extends React.Component {
  state = {
    user: this.context.currentUser,
    requests: this.context.userRequests,
    events: []
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

        {/* <section>
        <h2>Options</h2>
        <ul>
          <li>Update Profile</li>
          <li>Change Password</li>
          <li>Delete Account</li>
        </ul>
      </section> */}
      </>
    )
  }
}

export default MyAccountPage;