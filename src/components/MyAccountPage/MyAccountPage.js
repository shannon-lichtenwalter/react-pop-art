import React from 'react';
import PopArtContext from '../../context/PopArtContext';
import UsersApiService from '../../services/users-api-service';
import RequestorsApiService from '../../services/requestors-api-service';
import EventsApiService from '../../services/events-api-service';
import RequestedEvents from '../RequestedEvents/RequestedEvents';
import HostedEvents from '../HostedEvents/HostedEvents';

class MyAccountPage extends React.Component{
  state = {
    user: null,
    requests: [],
    events: []
  };

  static contextType = PopArtContext;

  setUser = (user) => {
    this.setState({
      user
    })
  }

  componentDidMount(){
      UsersApiService.getLoggedInUser()
        .then(res => {
          this.setUser(res);
        })
        .catch((e) => this.context.setError(e));

        RequestorsApiService.getAllRequests()
          .then(result => {
            this.setState({
              requests: result
            })
          })
          .catch((e) => this.context.setError(e))
        
        EventsApiService.getAllEventsHostedByUser()
          .then(result => {
            console.log(result);
            this.setState({
              events: result
            })
          })
          .catch((e) => this.context.setError(e))
    }



  render(){ 
    return(
      <>
      <h2> Welcome back{this.state.user ? ', ' + this.state.user.username : ''} </h2>
      <section>
        <h2>Your Booking Requests</h2>
          {this.state.requests ? <RequestedEvents requests={this.state.requests}/> : ''}
      </section>
  
      <section>
        <h2>Your Hosted Events</h2>
        <button>Create New Event</button>
        {this.state.events ? <HostedEvents events={this.state.events}/> : ''}
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