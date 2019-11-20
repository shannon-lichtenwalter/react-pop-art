import React from 'react';
import PopArtContext from '../../context/PopArtContext';
import UsersApiService from '../../services/users-api-service';
import RequestorsApiService from '../../services/requestors-api-service';
import * as moment from 'moment';
import EventsApiService from '../../services/events-api-service';

class MyAccountPage extends React.Component{
  state = {
    user: null,
    requests: [ {eventname: 'event', eventdate: '12/12/19', status: 'pending'}],
    events: [
      {
      name:'show',
      date: '11/30/19',
      time: '08:00:00', 
      requestors:[
        {username:'Jane', booking_status:'pending', user_id: 1},
      ]
      }
    ]
  };

  static contextType = PopArtContext;

  setUser = (user) => {
    this.setState({
      user
    })
  }

  componentDidMount(){
    if (this.context.loggedIn) {
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
  }


  render(){ 
    return(
      <>
      <h2> Welcome back{this.state.user ? ', ' + this.state.user.username : ''} </h2>
      <section>
        <h2>Your Booking Requests</h2>
        <ul>
          <li>{this.state.requests[0].name} on {moment(this.state.requests[0].date).format('LL')} at {moment(this.state.requests[0].date, 'HH:mm').format('LT')} :: {this.state.requests[0].booking_status} </li>
          <li>Twist and Shout Records on November 20th :: Denied </li>
          <li>Jives Coffee Shop on November 20th :: Approved</li>
          <li>Wine Bar on November 29th :: Approved</li>
        </ul>
      </section>
  
      <section>
        <h2>Your Events</h2>
        <button>Create New Event</button>
        <ul>
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
  
      </section>
  
      <section>
        <h2>Options</h2>
        <ul>
          <li>Update Profile</li>
          <li>Change Password</li>
          <li>Delete Account</li>
        </ul>
      </section>
      </>
    )
  }
}

export default MyAccountPage;